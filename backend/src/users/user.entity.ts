import ResearchGroup from 'src/research-group/research-group.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  SYSADMIN = 'sysadmin',
}

export const USER_UUID_TOKEN = '<user_uuid>';

@Entity()
export class User {
  isSysAdmin(): boolean {
    return this.roles.length == 1 && this.roles[0] == UserRole.SYSADMIN;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  birthDate!: Date;

  @Column({ nullable: true })
  hash!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: 'O' })
  gender!: string;

  @Column({ default: '', nullable: true })
  confirmationCode!: string;

  @Column({ nullable: true })
  recoverPasswordHash?: string;

  @ManyToOne((type) => ResearchGroup, { cascade: ['insert'] })
  researchGroup!: ResearchGroup;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  roles: UserRole[] = [];

  addRole(userRole: UserRole) {
    if (this.roles.indexOf(userRole) == -1) {
      this.roles.push(userRole);
    }
  }

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @Column({
    type: 'jsonb',
    default: () => "'{}'",
    nullable: false,
  })
  data!: Object;
}
