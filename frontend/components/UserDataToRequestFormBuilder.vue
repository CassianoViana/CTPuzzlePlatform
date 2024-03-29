<template>
  <div class="form-builder panel shadow white">
    <div class="flex-row bottom-marged">
      <span>
        <h2 style="margin-bottom: 0">
          {{
            isQuizAfterTest
              ? "Questionário após finalizar o teste"
              : "Questionário antes de iniciar o teste"
          }}
        </h2>
        <el-button
          @click="toggleMomentOfQuizPresentation"
          type="text"
          size="mini"
          :title="`Mostrar questionário ${
            isQuizAfterTest ? 'antes' : 'depois'
          } de o usuário realizar o teste`"
        >
          {{ isQuizAfterTest ? "Mostrar no início" : "Mostrar no fim" }}
        </el-button>
      </span>
      <span>
        <el-button
          @click="testQuizForm"
          type="warning"
          icon="el-icon-monitor"
          style="font-weight: bold"
        >
          Testar formulário
        </el-button>
      </span>
    </div>

    <table style="width: 100%">
      <tr>
        <th style="width: 50px"></th>
        <th>Pergunta</th>
        <th style="width: 200px">Tipo</th>
        <th style="width: 100px">Obrigatório</th>
        <th style="width: 100px">Remover</th>
      </tr>
      <tr
        v-for="(userDataVariable, index) in userDataList"
        :key="userDataVariable.id"
      >
        <td>
          <el-button
            type="text"
            title="Mover para cima"
            icon="el-icon-arrow-up"
            @click="up(userDataVariable, index)"
          ></el-button>
          <el-button
            style="margin-left: 0"
            title="Mover para baixo"
            type="text"
            icon="el-icon-arrow-down"
            @click="down(userDataVariable, index)"
          ></el-button>
        </td>
        <td>
          <el-input
            class="big bold"
            :ref="`input${index}`"
            v-model="userDataVariable.name"
          />
        </td>
        <td>
          <div class="flex-row">
            <el-select
              class="big bold"
              v-model="userDataVariable.variableType"
              value-key="id"
              @change="handleChange(userDataVariable)"
            >
              <el-option
                :key="variableType.id"
                v-for="variableType in variableTypes"
                :value="variableType"
                :label="variableType.varTypeName"
              >
              </el-option>
            </el-select>
            <el-button
              v-show="userDataVariable.variableType.varType == 'options'"
              @click="handleChange(userDataVariable)"
              style="margin-left: 5px"
              type="warning"
              size="small"
              icon="el-icon-edit"
              >Editar</el-button
            >
          </div>
        </td>
        <td style="text-align: center">
          <el-switch v-model="userDataVariable.required" />
        </td>
        <td>
          <btn-remove @click="removeVariable(userDataVariable)"></btn-remove>
        </td>
      </tr>
      <tr style="margin-top: 10px">
        <td></td>
        <td style="padding-top: 10px">
          <el-button
            title="Adicionar pergunta"
            class="fill"
            style="font-weight: bold"
            icon="el-icon-plus"
            size="large"
            type="warning"
            @click="addVariable"
          >
            Adicionar nova pergunta
          </el-button>
        </td>
      </tr>
    </table>
    <el-dialog
      :visible.sync="optionsListDialogVisible"
      :title="questionBeingEditted.name || 'Definir opções de resposta'"
    >
      <template>
        <div v-if="questionBeingEditted">
          <div
            :key="option.id"
            v-for="option in questionBeingEditted.options"
            style="margin-bottom: 10px"
          >
            <div class="flex-row">
              <el-input
                :ref="`optionInput${option.id}`"
                v-model="option.name"
              ></el-input>
              <btn-remove
                style="margin-left: 10px"
                @click="removeOption(questionBeingEditted, option)"
              ></btn-remove>
            </div>
          </div>
          <el-button
            type="primary"
            size="small"
            style="margin-top: 20px"
            icon="el-icon-plus"
            @click="addVarOption"
            >Adicionar opção de resposta</el-button
          >
        </div>
        <div slot="footer">
          <el-button type="primary" @click="saveOptions">Salvar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, VModel, Watch } from "nuxt-property-decorator";
import { ElInput } from "element-ui/types/input";

import {
  UserDataType,
  UserDataQuestion,
  VarType,
  VarOption,
  UserQuizSession,
} from "~/types/UserDataQuiz";
import { MomentOfQuizPresentation } from "~/types/Test";

@Component
export default class UserDataToRequestFormBuilder extends Vue {
  @VModel() userDataList!: UserDataQuestion[];
  @Prop({ default: "after-the-test" }) moment!: MomentOfQuizPresentation;

  optionsListDialogVisible: boolean = false;
  questionBeingEditted: UserDataQuestion = new UserDataQuestion();
  momentOfPresentation: MomentOfQuizPresentation = "after-the-test";

  @Watch("moment", { immediate: true })
  onChangeMoment() {
    this.momentOfPresentation = this.moment;
  }

  toggleMomentOfQuizPresentation() {
    this.momentOfPresentation = this.isQuizAfterTest
      ? "before-the-test"
      : "after-the-test";
    this.$emit("update:moment", this.momentOfPresentation);
  }

  get isQuizAfterTest() {
    return this.momentOfPresentation == "after-the-test";
  }

  get variableTypes(): UserDataType[] {
    return [
      { id: 1, varTypeName: "Número", varType: "number" },
      { id: 2, varTypeName: "Texto", varType: "string" },
      { id: 3, varTypeName: "Sim ou não", varType: "boolean" },
      { id: 4, varTypeName: "Opções", varType: "options" },
      { id: 5, varTypeName: "Texto longo", varType: "longString" },
    ];
  }

  getVarType(varType: VarType): UserDataType {
    return this.variableTypes.filter((it) => it.varType == varType)[0];
  }

  removeOption(question: UserDataQuestion, option: VarOption) {
    const options = question.options;
    options.splice(options.indexOf(option), 1);
  }

  up(userDataVariable: UserDataQuestion, index: number) {
    let aux = this.userDataList[index - 1];
    if (aux) {
      this.userDataList.splice(index - 1, 1, userDataVariable);
      this.userDataList.splice(index, 1, aux);
    }
  }

  down(userDataVariable: UserDataQuestion, index: number) {
    let aux = this.userDataList[index + 1];
    if (aux) {
      this.userDataList.splice(index + 1, 1, userDataVariable);
      this.userDataList.splice(index, 1, aux);
    }
  }

  addVarOption() {
    const newOption = new VarOption();
    if (!this.questionBeingEditted.options) {
      Vue.set(this.questionBeingEditted, "options", []);
    }
    const options = this.questionBeingEditted.options;
    newOption.name = `Opção ${options.length}`;
    newOption.id = (options[options.length - 1]?.id || 0) + 1;
    options.push(newOption);
    this.$nextTick(() => {
      let elements = this.$refs[`optionInput${newOption.id}`] as any[];
      if (elements.length) {
        const optionInput = elements[0] as ElInput;
        if (optionInput) {
          optionInput.focus();
          optionInput.select();
        }
      }
    });
  }

  removeVariable(userDataVariable: UserDataQuestion) {
    let index = this.userDataList.indexOf(userDataVariable);
    this.userDataList.splice(index, 1);
  }

  handleChange(userDataVariable: UserDataQuestion) {
    if (userDataVariable.variableType.varType == "options") {
      this.showOptionsListBuilder();
      this.questionBeingEditted = userDataVariable;
    }
  }

  showOptionsListBuilder() {
    this.optionsListDialogVisible = true;
  }

  saveOptions() {
    this.optionsListDialogVisible = false;
  }

  testQuizForm() {
    let quiz = new UserQuizSession();
    quiz.questions = this.userDataList;
    let link = document.createElement("a");
    link.href = `/quiz?quiz=${JSON.stringify(quiz)}`;
    link.target = "_blank";
    link.click();
  }

  addVariable() {
    let variable = new UserDataQuestion();
    let lastVariable = this.userDataList[this.userDataList.length];
    if (lastVariable) {
      variable.id = lastVariable.id + 1;
    }

    let randomQuestions = [
      "Qual é seu nome?",
      "Gosta de problemas?",
      "Quais padrões você observou?",
      "Prefere jogos de corrida ou de cartas?",
      "Você resolveu em partes, ou tudo de uma vez?",
      "Gostou do jogo?",
      "O que mudaria?",
      "Jogaria novamente?",
      "Precisou de ajuda?",
    ];

    variable.name =
      randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
    variable.variableType = this.getVarType("number");

    this.userDataList.push(variable);

    this.$nextTick(() => {
      let inputToFocus = `input${this.userDataList.length - 1}`;
      let elements = this.$refs[inputToFocus] as any[];
      if (elements && elements.length) {
        let elInput = elements[0] as ElInput;
        if (elInput) {
          elInput.select();
          elInput.focus();
        }
      }
    });
  }

  mounted() {
    if (!this.userDataList?.length)
      this.userDataList = [
        {
          id: 1,
          name: "Nome",
          variableType: this.getVarType("string"),
          required: false,
          answer: "",
          options: [],
        },
        {
          id: 2,
          name: "Idade",
          variableType: this.getVarType("number"),
          required: false,
          answer: "",
          options: [],
        },
        {
          id: 3,
          name: "Já programou alguma vez?",
          variableType: this.getVarType("boolean"),
          required: false,
          answer: "",
          options: [],
        },
        {
          id: 4,
          name: "O que achou do teste?",
          variableType: this.getVarType("string"),
          required: false,
          answer: "",
          options: [],
        },
      ];
  }
}
</script>
<style lang="scss">
.form-builder {
  margin: 20px auto;
  //border: 1px solid red;
}
</style>