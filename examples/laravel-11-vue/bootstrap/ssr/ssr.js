import axios from "axios";
import VueCookies from "vue-cookies";
import { createI18n } from "vue-i18n";
import { defaultConfig, plugin } from "@formkit/vue";
import VueSweetalert2 from "vue-sweetalert2";
import { genesisIcons } from "@formkit/icons";
import { pt as pt$1, en } from "@formkit/i18n";
import { createProPlugin, inputs } from "@formkit/pro";
/* empty css                                   */
import { defineComponent, h as h$1, createSSRApp } from "vue";
import "./assets/vendor-others-CNLO9YKw.js";
import { renderToString } from "@vue/server-renderer";
import express from "express";
import { JSDOM } from "jsdom";
import { parse, stringify } from "qs";
import Cookies from "js-cookie";
if (typeof window !== "undefined") {
  window.axios = axios;
  window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  window.axios.defaults.headers.common["Accept"] = "application/json";
}
const Cancel = "Cancelar";
const Close = "Fechar";
const Code = "Código";
const Confirm = "Confirmar";
const Create = "Criar";
const Dashboard = "Painel de controle";
const Delete = "Deletar";
const Disable = "Desabilitar";
const Enable = "Habilitar";
const Home = "Página Principal";
const Login = "Entrar";
const Logout = "Sair";
const Name = "Nome";
const Nevermind = "Deixa pra lá";
const Password = "Senha";
const Permissions = "Permissões";
const Profile = "Perfil";
const Regards = "Saudações";
const Register = "Registre-se";
const Save = "Salvar";
const Showing = "Mostrando";
const Submit = "Submeter";
const of = "de";
const results = "resultados";
const to = "até";
const Role = "Função";
const Administrator = "Administrador";
const Member = "Membro";
const Remove = "Remover";
const Page = "Página";
const Search = "Buscar";
const Edit = "Editar";
const Add = "Adicionar";
const Description = "Descrição";
const Comments = "Comentários";
const You = "Você";
const Loading = "Carregando";
const Reply = "Responder";
const Response = "Resposta";
const Show = "Mostrar";
const Actions = "Ações";
const cool_nickname = "apelido_daora";
const Delivered = "Entregue";
const Subject = "Assunto";
const Companies = "Empresas";
const Company = "Empresa";
const Developers = "Desenvolvedores";
const Developer = "Desenvolvedor";
const Projects = "Projetos";
const Project = "Projeto";
const Teams = "Times";
const Team = "Time";
const Contact = "Contato";
const pt = {
  "(and :count more error)": "(e mais :count erro)",
  "(and :count more errors)": "(e mais :count erros)",
  "A fresh verification link has been sent to your email address.": "Um novo link de verificação foi enviado para seu e-mail",
  "A new verification link has been sent to your email address.": "Um novo link de verificação foi enviado para seu endereço de e-mail.",
  "API Token": "Token de API",
  "API Token Permissions": "Permissões do Token de API",
  "API Tokens": "Tokens de API",
  "API tokens allow third-party services to authenticate with our application on your behalf.": "Tokens de API permitem que serviços de terceiros autentiquem-se sem precisar utilizar o login e senha do usuário. Pode-se criar um ou mais tokens de API e revogá-los a qualquer momento.",
  "Accept Invitation": "Aceitar Convite",
  "Add additional security to your account using two factor authentication.": "Adicione uma camada a mais de segurança para acessar sua conta usando autenticação de dois fatores.",
  "All rights reserved.": "Todos os direitos reservados.",
  "Already registered?": "Já registrado?",
  "Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Você tem certeza que quer deletar essa conta? Uma vez que sua conta é deletada, todos os dados serão permanentemente deletados. Por favor, entre com a sua senha para confirmar que você quer deletar permanentemente sua conta.",
  "Are you sure you would like to delete this API token?": "Tem certeza de que deseja excluir este token de API?",
  "Before proceeding, please check your email for a verification link.": "Antes de prosseguir, por favor, veja se recebeu o link de verificação em seu e-mail",
  "Browser Sessions": "Sessões do navegador",
  Cancel,
  "Click here to re-send the verification email.": "Clique aqui para reenviar o e-mail de verificação.",
  Close,
  Code,
  Confirm,
  "Confirm Password": "Confirmação de senha",
  Create,
  "Create API Token": "Criar um Token de API",
  "Create Account": "Criar Conta",
  "Create New Team": "Criar um novo Time",
  "Created.": "Criado.",
  "Current Password": "Senha Atual",
  Dashboard,
  Delete,
  "Delete API Token": "Deletar o Token de API",
  "Delete Account": "Deletar Conta",
  Disable,
  "E-Mail Address": "E-mail",
  "Email Address": "Endereço de e-mail",
  "Email Password Reset Link": "Enviar link para redefinir senha por e-mail",
  Enable,
  "Ensure your account is using a long, random password to stay secure.": "Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura.",
  "Forgot Your Password?": "Esqueceu sua senha?",
  "Forgot your password?": "Esqueceu sua senha?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Esqueceu sua senha? Sem problemas. Apenas informe seu endereço de e-mail que enviaremos um link que permitirá definir uma nova senha.",
  "Hello!": "Olá!",
  Home,
  "I agree to the :terms_of_service and :privacy_policy": "Eu concordo com os :terms_of_service e com a :privacy_policy",
  "If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.": "Se necessário, você pode sair de todas as outras sessões do navegador em todos os seus dispositivos. Algumas de suas sessões recentes estão listadas abaixo; no entanto, esta lista pode não ser exaustiva. Se você acha que sua conta foi comprometida, você também deve atualizar sua senha.",
  "If you already have an account, you may accept this invitation by clicking the button below:": "Se já tiver uma conta, você pode aceitar esse convite através do botão abaixo:",
  "If you did not create an account, no further action is required.": "Se você não criou a conta, favor desconsiderar este e-mail",
  "If you did not expect to receive an invitation to this team, you may discard this email.": "Se você não sabe porque está recebendo um convite para esse time, pode descartar esse e-mail",
  "If you did not receive the email": "Se você não recebeu o e-mail",
  "If you did not request a password reset, no further action is required.": "Se você não solicitou a redefinição de senha, nenhuma ação adicional será necessária.",
  "If you do not have an account, you may create one by clicking the button below. After creating an account, you may click the invitation acceptance button in this email to accept the team invitation:": "Caso não tenha uma conta, você pode criar uma usando o botão abaixo. Após criar a conta, você pode clicar no botão de aceitar convite nesse e-mail para aceitar o convite para o time",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Se você estiver com problemas para clicar no botão ":actionText", copie e cole o URL abaixo\nem seu navegador da web:',
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser: [:displayableActionUrl](:actionURL)': 'Se você estiver com problemas para clicar no botão ":actionText", copie e cole o URL abaixo\nem seu navegador da web: [:displayableActionUrl](:actionURL)',
  "Jon Doe": "João da Silva",
  "The Beatles": "Os Beatles",
  "Log Out": "Sair",
  "Log Out Other Browser Sessions": "Sair de outras sessões do navegador",
  "Log in": "Entrar",
  Login,
  Logout,
  "Manage API Tokens": "Gerenciador de Tokens de API",
  "Manage Account": "Gerenciar Conta",
  "Manage and log out your active sessions on other browsers and devices.": "Gerencie e saia de suas sessões ativas em outros navegadores e dispositivos.",
  Name,
  Nevermind,
  "New Password": "Nova Senha",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes de excluir sua conta, baixe todos os dados ou informações que deseja reter.",
  Password,
  "Permanently delete your account.": "Deleta permanentemente a sua conta.",
  Permissions,
  "Please click the button below to verify your email address.": "Clique no botão abaixo para verificar seu endereço de e-mail",
  "Please confirm access to your account by entering one of your emergency recovery codes.": "Por favor, confirme o acesso à sua conta digitando um de seus códigos de emergência.",
  "Please confirm access to your account by entering the authentication code provided by your authenticator application.": "Por favor, confirme o acesso à sua conta digitando o código da autenticação provido pelo seu aplicativo autenticador.",
  "Please confirm your password before continuing.": "Por favor, confirme sua senha para continuar.",
  "Please copy your new API token. For your security, it won't be shown again.": "Por favor, copie o seu Token de API. Por motivo de segurança, ele não será mostrado novamente.",
  "Privacy Policy": "Política de Privacidade",
  Profile,
  "Profile Information": "Informação do Perfil",
  "Recovery Code": "Código Recuperado",
  Regards,
  "Regenerate Recovery Codes": "Gerar novamente os códigos de recuperação",
  Register,
  "Remember Me": "Manter conectado",
  "Remember me": "Manter conectado",
  "Remove Photo": "Remover imagem",
  "Resend Verification Email": "Reenviar o e-mail de verificação",
  "Reset Password": "Modificar Senha",
  "Reset Password Notification": "Notificação de redefinição de senha",
  Save,
  "Saved.": "Salvou",
  "Select A New Photo": "Selecione uma nova imagem",
  "Send Password Reset Link": "Enviar link para redefinir senha",
  "Show Recovery Codes": "Mostrar os códigos de recuperação",
  Showing,
  "Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.": "Armazene esses códigos de recuperação em um local seguro. Eles podem ser utilizados para recuperar o acesso à sua conta caso você perca o seu telefone.",
  Submit,
  "Switch Teams": "Mudar os Times",
  "Team Settings": "Gerenciamento de Times",
  "Terms of Service": "Termos do Serviço",
  "The :attribute must be at least :length characters and contain at least one number.": "O campo :attribute deve ter pelo menos :length caracteres e conter pelo menos um número.",
  "The :attribute must be at least :length characters and contain at least one special character.": "O campo :attribute deve ter pelo menos :length caracteres e conter pelo menos um caractere especial.",
  "The :attribute must be at least :length characters and contain at least one uppercase character and one number.": "O campo :attribute deve ter pelo menos :length caracteres e conter pelo menos um caractere maiúsculo e um número.",
  "The :attribute must be at least :length characters and contain at least one uppercase character and one special character.": "O campo :attribute deve ter pelo menos :length caracteres e conter pelo menos um caractere maiúsculo e um caractere especial.",
  "The :attribute must be at least :length characters and contain at least one uppercase character, one number, and one special character.": "O campo :attribute deve ter pelo menos :length caracteres e conter pelo menos um caractere maiúsculo, um número e um caractere especial.",
  "The :attribute must be at least :length characters and contain at least one uppercase character.": "O campo :attribute deve ter pelo menos :length e conter pelo menos um caractere maiúsculo.",
  "The :attribute must be at least :length characters.": "O campo :attribute deve ter pelo menos :length caracteres.",
  "The given data was invalid.": "Os dados fornecidos são inválidos.",
  "This is a secure area of the application. Please confirm your password before continuing.": "Essa é uma área segura da aplicação. Por favor confirme sua senha antes de continuar.",
  "This password does not match our records.": "Esta Senha não bate com nossos registros.",
  "This password reset link will expire in :count minutes.": "Este link de redefinição de senha expirará em :count minutos.",
  "Toggle navigation": "Alternar navegação",
  "Token Name": "Nome do Token",
  "Two Factor Authentication": "Autenticação de dois fatores",
  "Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.": "A autenticação de dois fatores agora está habilitada. Digitalize o seguinte código QR usando o aplicativo autenticador do seu telefone.",
  "Update Password": "Atualizar a senha",
  "Update your account profile information and email address.": "Atualize as informações do perfil e o endereço de e-mail da sua conta.",
  "Update your account's profile information and email address.": "Atualize as informações do perfil da sua conta e o endereço de e-mail.",
  "Use a recovery code": "Use o código recuperado",
  "Use an authentication code": "Use um código de autenticação",
  "Verify Email Address": "Verificar E-mail",
  "Verify Your Email Address": "Verifique seu endereço de e-mail",
  "When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.": "Quando a autenticação de dois fatores estiver habilitada, você será solicitado a fornecer um token aleatório seguro durante a autenticação. Você pode recuperar esse token do aplicativo Google Authenticator do seu telefone.",
  "Whoops! Something went wrong.": "Opa! Algo deu errado.",
  "You're logged in": "Você está logado",
  "You are logged in": "Você está logado",
  "You are receiving this email because we received a password reset request for your account.": "Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta.",
  "You have been invited to join the :team team!": "Você foi convidado para entrar no time :team!",
  "You have enabled two factor authentication.": "Você já habilitou a autenticação de dois fatores.",
  "You have not enabled two factor authentication.": "Você ainda não habilitou a autenticação de dois fatores.",
  "You may delete any of your existing tokens if they are no longer needed.": "Você deve deletar os tokens sem utilização.",
  "Your email address is unverified.": "Seu endereço de e-mail não foi verificado.",
  "click here to request another": "clique aqui para solicitar outro",
  of,
  results,
  to,
  "Team Name": "Nome do Time",
  "The team's name and owner information.": "O nome do time e informações do proprietário.",
  "Add Team Member": "Adicionar Membro ao Time",
  "Add a new team member to your team, allowing them to collaborate with you.": "Adicione um novo membro à sua equipe, permitindo que ele colabore com você.",
  "Team Members": "Membros do Time",
  "All of the people that are part of this team.": "Todas as pessoas que fazem parte deste time.",
  "Team Owner": "Proprietário do Time",
  "Please provide the email address of the person you would like to add to this team.": "Por favor, forneça o endereço de e-mail da pessoa que você gostaria de adicionar a este time.",
  Role,
  Administrator,
  Member,
  "Remove from Team": "Remover do Time",
  "Remove this person from the team.": "Remova esta pessoa do time.",
  "Administrator users can perform any action.": "O administrador pode realizar qualquer ação.",
  "Editor users have the ability to read, create, and update.": "O editor pode ler, criar e atualizar",
  Remove,
  "Per Page": "Por Página",
  Page,
  "Current Page": "Página Atual",
  Search,
  Edit,
  "Loading...": "Carregando...",
  "Return to": "Retornar para",
  "Click to view projects of Company": "Clique para ver os projetos da Empresa",
  "Are you sure?": "Você tem certeza?",
  "Yes, delete it!": "Sim, deletar!",
  "No, cancel!": "Não, cancelar!",
  "Deleted!": "Deletado!",
  "Record deleted!": "Registro deletado!",
  "Updated!": "Atualizado!",
  "Record updated!": "Registro atualizado!",
  "Error!": "Erro!",
  'This is the example of how to use Laravext with Vue.js in a Laravel 11 project (although in the "traditional" directory structure from Laravel 10). There\'re some pages in the navbar above that you can check. They\'re meerly examples of how you could use Laravext in your project and do not actually represent "Our Team" (as in Laravext\'s team) or "Our Projects" (as in Laravext\'s projects).': 'Este é um exemplo de como usar Laravext com Vue.js em um projeto Laravel 11 (embora na estrutura de diretórios "tradicional" do Laravel 10). Há algumas páginas na barra de navegação acima que você pode verificar. Elas são meros exemplos de como você poderia usar Laravext em seu projeto e não representam realmente "Nosso Time" (como no time do Laravext) ou "Nossos Projetos" (como nos projetos do Laravext).',
  "Click here to check Laravext's GitHub repository": "Clique aqui para conferir o repositório do Laravext no GitHub",
  Add,
  "Contact Requests": "Solicitações de Contato",
  "Contact Request": "Solicitação de Contato",
  "An error occurred while deleting the project.": "Ocorreu um erro ao deletar o projeto.",
  "An error occurred while deleting the company.": "Ocorreu um erro ao deletar a empresa.",
  "An error occurred while deleting the team.": "Ocorreu um erro ao deletar o time.",
  "An error occurred while deleting the developer.": "Ocorreu um erro ao deletar o desenvolvedor.",
  "An error occurred while deleting the contact request.": "Ocorreu um erro ao deletar o pedido de contato.",
  "An error occurred while updating the project.": "Ocorreu um erro ao atualizar o projeto.",
  "An error occurred while updating the company.": "Ocorreu um erro ao atualizar a empresa.",
  "An error occurred while updating the team.": "Ocorreu um erro ao atualizar o time.",
  "An error occurred while updating the developer.": "Ocorreu um erro ao atualizar o desenvolvedor.",
  "An error occurred while updating the contact request.": "Ocorreu um erro ao atualizar o pedido de contato.",
  "The company has been updated.": "A empresa foi atualizada.",
  "The team has been updated.": "O time foi atualizado.",
  "The developer has been updated.": "O desenvolvedor foi atualizado.",
  "The project has been updated.": "O projeto foi atualizado.",
  "The company has been deleted.": "A empresa foi deletada.",
  "The team has been deleted.": "O time foi deletado.",
  "The developer has been deleted.": "O desenvolvedor foi deletado.",
  "The project has been deleted.": "O projeto foi deletado.",
  "The contact request has been deleted.": "O pedido de contato foi deletado.",
  "Create a company": "Criar uma empresa",
  "Edit company": "Editar empresa",
  "Create a project": "Criar um projeto",
  "Edit project": "Editar projeto",
  "Search for a company": "Buscar por uma empresa",
  "Search for a team": "Buscar por um time",
  "A brief description of the project": "Uma breve descrição do projeto",
  Description,
  Comments,
  You,
  "Write a comment...": "Escreva um comentário...",
  Loading,
  "Load more": "Carregar mais",
  "No website": "Sem site",
  "Create a team": "Criar um time",
  "Edit team": "Editar time",
  Reply,
  Response,
  "Your response here": "Sua resposta aqui",
  "Contact request's response": "Resposta do pedido de contato",
  "Reply to contact request": "Responder ao pedido de contato",
  "Replied by": "Respondido por",
  "Click to remove the developer from the team": "Clique para remover o desenvolvedor do time",
  "Click to enable privacy filter": "Clique para habilitar o filtro de privacidade",
  "Click to disable privacy filter": "Clique para desabilitar o filtro de privacidade",
  "Create a developer": "Criar um desenvolvedor",
  "Edit developer": "Editar desenvolvedor",
  Show,
  "Click to view projects of Team": "Clique para ver os projetos do Time",
  Actions,
  cool_nickname,
  "Add developer to team": "Adicionar desenvolvedor ao time",
  "Type to search for a developer by email or name": "Digite para buscar um desenvolvedor por e-mail ou nome",
  "Created At": "Criado em",
  "Replied At": "Respondido em",
  Delivered,
  "On delivery queue": "Na fila de entrega",
  Subject,
  Companies,
  Company,
  Developers,
  Developer,
  Projects,
  Project,
  Teams,
  Team,
  Contact,
  "Our Teams": "Nossos Times",
  "Our Companies": "Nossas Empresas",
  "Our Developers": "Nossos Desenvolvedores",
  "Our Projects": "Nossos Projetos"
};
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(this, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: n }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2)
    t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2)
    void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2)
    for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
      var f2 = a2[s2], c2 = i2[f2];
      "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3)
          void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2)
    return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length)
    return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2)
    return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1)
      r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2)
    return e2;
  if ("object" != typeof r2) {
    if (u(e2))
      e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2)
        return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2)
    return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else
      e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, b = Date.prototype.toISOString, g = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: g, formatter: o.formatters[g], indices: false, serializeDate: function(t4) {
  return b.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, b2, g2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2)
      return u2 && !g2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = g2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && g2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + b2(u2(O2[S2], v.encoder, m2, "value", y2));
        return [b2($2) + "=" + E2];
      }
      return [b2($2) + "=" + b2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [b2(r2) + "=" + b2(String(w2))];
  }
  var R2, x2 = [];
  if (void 0 === w2)
    return x2;
  if ("comma" === n2 && p(w2))
    R2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2))
    R2 = a2;
  else {
    var N2 = Object.keys(w2);
    R2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < R2.length; ++T2) {
    var k2 = R2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, b2, g2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, S = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes)
        return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes)
        return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, R = function(t4, e2) {
  var r2 = function(t5) {
    if (!t5)
      return $;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? $.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : $.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : $.arrayLimit, charset: void 0 === t5.charset ? $.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : $.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : $.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : $.decoder, delimiter: "string" == typeof t5.delimiter || f.isRegExp(t5.delimiter) ? t5.delimiter : $.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : $.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : $.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : $.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : $.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : $.strictNullHandling };
  }(e2);
  if ("" === t4 || null == t4)
    return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel)
      for (r3 = 0; r3 < o3.length; ++r3)
        0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3)
      if (r3 !== i3) {
        var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
          return e3.decoder(t6, $.decoder, u3, "value");
        })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
      }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = S(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    if (!this.definition.methods.includes("GET"))
      return false;
    const e2 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i2 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i2})?` : `${e3}${i2}`;
    }).replace(/^\w+:\/\//, ""), [r2, n2] = t4.replace(/^\w+:\/\//, "").split("?"), o2 = new RegExp(`^${e2}/?$`).exec(decodeURI(r2));
    if (o2) {
      for (const t5 in o2.groups)
        o2.groups[t5] = "string" == typeof o2.groups[t5] ? decodeURIComponent(o2.groups[t5]) : o2.groups[t5];
      return { params: o2.groups, query: R(n2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2]))
        throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : ""))
        throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2])
        throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5)
          return v;
        if (null != t5.encoder && "function" != typeof t5.encoder)
          throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format))
            throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2)
        return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2)
      return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4))
      return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  has(t4) {
    return Object.keys(this.t.routes).includes(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2))
        return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id"))
          throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
function rootClasses(sectionName, node) {
  const key = `${node.props.type}__${sectionName}`;
  const semanticKey = `formkit-${sectionName}`;
  const familyKey = node.props.family ? `family:${node.props.family}__${sectionName}` : "";
  const memoKey = `${key}__${familyKey}`;
  if (!(memoKey in classes)) {
    const sectionClasses = classes[key] ?? globals[sectionName] ?? {};
    sectionClasses[semanticKey] = true;
    if (familyKey in classes) {
      classes[memoKey] = { ...classes[familyKey], ...sectionClasses };
    } else {
      classes[memoKey] = sectionClasses;
    }
  }
  return classes[memoKey] ?? { [semanticKey]: true };
}
const classes = {
  "family:button__wrapper": {
    "group-data-[disabled=true]:grayscale": true
  },
  "family:button__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "font-bold": true,
    "rounded": true,
    "outline-none": true,
    "flex": true,
    "!text-sm": true,
    "px-7": true,
    "py-3": true,
    "items-center": true,
    "mb-1.5": true,
    "text-sm": true,
    "ring-offset-2": true,
    "ring-blue-500": true,
    "focus-visible:ring-2": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "shadow": true,
    "group-data-[prefix-icon]:pl-5": true,
    "group-data-[suffix-icon]:pr-5": true,
    "border": true,
    "border-blue-600": true,
    "text-blue-600": true,
    "group-[]/repeater:shadow-sm": true,
    "group-[]/multistep:shadow-sm": true,
    "dark:border-blue-500": true
  },
  "family:box__wrapper": {
    "inline-flex": true,
    "items-center": true,
    "mb-1": true,
    "group-data-[multiple]:mb-0": true
  },
  "family:box__legend": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "dark:text-neutral-300": true,
    "mb-2": true
  },
  "family:box__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "peer": true,
    "pointer-events-none": true,
    "absolute": true,
    "h-0": true,
    "w-0": true,
    "overflow-hidden": true,
    "opacity-0": true
  },
  "family:box__decorator": {
    "mr-1.5": true,
    "bg-white": true,
    "ring-blue-500": true,
    "peer-checked:border-blue-600": true,
    "relative": true,
    "block": true,
    "text-lg": true,
    "w-[1em]": true,
    "aspect-[1/1]": true,
    "border": true,
    "border-neutral-400": true,
    "text-transparent": true,
    "peer-checked:bg-blue-50": true,
    "peer-checked:text-blue-600": true,
    "peer-focus-visible:ring-2": true,
    "peer-focus-visible:ring-offset-1": true,
    "select-none": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "peer-disabled:bg-neutral-100": true,
    "group-data-[disabled]:grayscale": true,
    "shadow": true,
    "peer-disabled:cursor-not-allowed": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "dark:border-neutral-500": true,
    "dark:bg-transparent": true,
    "dark:ring-offset-blue-500": true,
    "dark:peer-focus-visible:ring-1": true,
    "dark:peer-disabled:bg-neutral-600/50": true,
    "dark:peer-checked:bg-blue-900": true,
    "dark:peer-checked:text-blue-400": true
  },
  "family:box__decoratorIcon": {
    "absolute": true,
    "left-1/2": true,
    "top-1/2": true,
    "flex": true,
    "h-full": true,
    "w-full": true,
    "-translate-x-1/2": true,
    "-translate-y-1/2": true
  },
  "family:box__option": {
    "mb-1.5": true,
    "last:mb-0": true,
    "data-[disabled]:opacity-50": true,
    "data-[disabled]:select-none": true,
    "group-data-[disabled]:data-[disabled]:opacity-100": true
  },
  "family:box__label": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "mb-1": true,
    "!mb-0": true,
    "!font-normal": true,
    "!text-sm": true,
    "dark:text-neutral-300": true
  },
  "family:box__optionHelp": {
    "text-neutral-500": true,
    "text-xs": true,
    "-mt-1": true,
    "mb-1.5": true,
    "ml-[min(2em,1.7rem)]": true,
    "relative": true,
    "left-px": true
  },
  "family:box__help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true,
    "mb-1": true,
    "group-data-[multiple]:mb-2": true,
    "group-data-[multiple]:-mt-1.5": true
  },
  "family:text__wrapper": {
    "flex": true,
    "flex-col": true,
    "items-start": true,
    "justify-start": true,
    "mb-1.5": true,
    "last:mb-0": true
  },
  "family:text__label": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "dark:text-neutral-300": true,
    "!inline-flex": true,
    "mb-1": true
  },
  "family:text__inner": {
    "text-base": true,
    "flex": true,
    "items-center": true,
    "w-full": true,
    "py-2": true,
    "px-3": true,
    "rounded": true,
    "border": true,
    "border-neutral-400": true,
    "bg-white": true,
    "focus-within:ring-1": true,
    "focus-within:!ring-blue-500": true,
    "focus-within:!border-blue-500": true,
    "group-data-[invalid]:border-red-500": true,
    "group-data-[invalid]:ring-1": true,
    "group-data-[invalid]:ring-red-500": true,
    "group-data-[disabled]:bg-neutral-100": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "shadow": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-500": true,
    "dark:group-data-[disabled]:bg-neutral-800/5": true,
    "dark:group-data-[invalid]:border-red-500": true,
    "dark:group-data-[invalid]:ring-red-500": true
  },
  "family:text__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "text-base": true,
    "text-neutral-700": true,
    "min-w-0": true,
    "min-h-[1.5em]": true,
    "grow": true,
    "outline-none": true,
    "bg-transparent": true,
    "selection:bg-blue-100": true,
    "placeholder:text-neutral-400": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "dark:placeholder-neutral-400/50": true,
    "dark:text-neutral-300": true,
    "border-none": true,
    "p-0": true,
    "focus:ring-0": true
  },
  "family:text__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "family:text__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__wrapper": {
    "mb-1.5": true
  },
  "family:dropdown__inner": {
    "relative": true,
    "flex": true,
    "items-center": true,
    "bg-white": true,
    "border": true,
    "border-neutral-400": true,
    "rounded": true,
    "group-data-[is-multiline]:!rounded": true,
    "focus-within:ring-1": true,
    "focus-within:!ring-blue-500": true,
    "focus-within:!border-blue-500": true,
    "group-data-[invalid]:border-red-500": true,
    "group-data-[invalid]:ring-1": true,
    "group-data-[invalid]:ring-red-500": true,
    "group-data-[disabled]:bg-neutral-100": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "shadow": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-500": true,
    "dark:group-data-[disabled]:bg-neutral-700/40": true,
    "dark:group-data-[invalid]:border-red-500": true,
    "dark:group-data-[invalid]:ring-red-500": true
  },
  "family:dropdown__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "grow": true,
    "p-2": true,
    "pr-0": true,
    "pl-3": true,
    "text-base": true,
    "text-neutral-700": true,
    "text-ellipsis": true,
    "min-w-0": true,
    "outline-none": true,
    "bg-transparent": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "group-data-[prefix-icon]:!pl-0": true,
    "group-data-[suffix-icon]:!pr-0": true,
    "placeholder:text-neutral-400": true,
    "selection:bg-blue-100": true,
    "dark:placeholder:text-neutral-500": true,
    "dark:text-neutral-300": true,
    "border-none": true,
    "focus:ring-0": true,
    "bg-none": true
  },
  "family:dropdown__listboxButton": {
    "w-[2.5em]": true,
    "self-stretch": true,
    "text-base": true,
    "flex": true,
    "items-center": true,
    "text-neutral-700": true,
    "z-10": true,
    "dark:text-neutral-300": true,
    "data-[disabled]:cursor-not-allowed": true
  },
  "family:dropdown__removeSelection": {
    "w-[2.5em]": true,
    "self-stretch": true,
    "text-base": true,
    "flex": true,
    "items-center": true,
    "text-neutral-700": true,
    "hover:text-red-400": true,
    "z-10": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__controlLabel": {
    "absolute": true,
    "opacity-0": true,
    "pointer-events-none": true,
    "text-[0px]": true
  },
  "family:dropdown__selectIcon": {
    "text-base": true,
    "inline-flex": true,
    "justify-center": true,
    "w-[2.5em]": true,
    "relative": true,
    "my-auto": true,
    "[&>svg]:w-[1em]": true,
    "[&>svg]:mx-auto": true
  },
  "family:dropdown__closeIcon": {
    "text-base": true,
    "w-[0.75em]": true,
    "relative": true,
    "m-auto": true
  },
  "family:dropdown__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "!ml-2": true,
    "!mr-0": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "!mr-2": true,
    "!ml-0": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__dropdownWrapper": {
    "rounded": true,
    "shadow-lg": true,
    "mt-1": true,
    "overflow-clip": true,
    "empty:hidden": true,
    "border": true,
    "border-neutral-300": true,
    "dark:border-neutral-600": true,
    "group-data-[expanded]:opacity-100": true,
    "group-data-[overscroll]:m-0": true,
    "group-data-[overscroll]:shadow-none": true,
    "group-data-[overscroll]:border-none": true
  },
  "family:dropdown__listitemGroup": {
    "group/optgroup": true,
    "last:pb-0": true,
    "border-t": true,
    "border-b": true,
    "-mb-px": true,
    "border-neutral-300": true,
    "dark:border-neutral-600": true
  },
  "family:dropdown__groupLabel": {
    "block": true,
    "pt-1.5": true,
    "pb-1": true,
    "px-2.5": true,
    "font-bold": true,
    "pointer-events-none": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__listbox": {
    "bg-white": true,
    "rounded": true,
    "empty:hidden": true,
    "dark:bg-neutral-800": true,
    "group-data-[overscroll]:shadow-lg": true,
    "group-data-[overscroll]:border": true,
    "group-data-[overscroll]:border-neutral-300": true,
    "group-data-[overscroll]:dark:border-neutral-600": true
  },
  "family:dropdown__listitem": {
    "relative": true,
    "flex": true,
    "items-center": true,
    "px-2": true,
    "py-1.5": true,
    "first:pt-2": true,
    "last:pb-2": true,
    "text-neutral-700": true,
    "text-base": true,
    "data-[is-active]:bg-blue-100": true,
    "dark:text-neutral-200": true,
    "dark:data-[is-active]:text-neutral-700": true,
    "before:content-['']": true,
    "before:absolute": true,
    "before:inset-0": true,
    "data-[is-active]:first:before:rounded": true,
    "data-[is-active]:first:before:rounded-b-none": true,
    "data-[is-active]:last:before:rounded": true,
    "data-[is-active]:last:before:rounded-t-none": true,
    "data-[is-active]:first:last:before:rounded": true,
    "data-[is-active]:before:ring-1": true,
    "data-[is-active]:before:ring-blue-500": true,
    "data-[is-active]:before:ring-inset": true,
    "data-[is-active]:before:ring-offset-blue-100": true,
    "group-[]/optgroup:first:before:!rounded-none": true,
    "group-[]/optgroup:last:before:!rounded-none": true
  },
  "family:dropdown__selectedIcon": {
    "flex": true,
    "absolute": true,
    "items-center": true,
    "text-blue-600": true,
    "left-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true
  },
  "family:dropdown__option": {
    "ml-[1.5em]": true
  },
  "family:dropdown__loadMore": {
    "data-[is-active]:bg-blue-100": true
  },
  "family:dropdown__loadMoreInner": {
    "flex": true,
    "text-sm": true,
    "text-neutral-500": true,
    "p-2": true,
    "items-center": true,
    "justify-center": true,
    "[&>span]:mr-2": true,
    "cursor-pointer": true,
    "dark:text-neutral-200": true,
    "dark:hover:text-blue-500": true
  },
  "family:dropdown__selectionWrapper": {
    "grow": true,
    "flex": true,
    "items-center": true,
    "text-neutral-700": true
  },
  "family:dropdown__selection": {
    "grow": true,
    "text-neutral-700": true,
    "group-data-[multiple]:p-2": true,
    "dark:text-neutral-300": true
  },
  "family:dropdown__tagsWrapper": {
    "w-full": true
  },
  "family:dropdown__tagWrapper": {
    "group/tag": true,
    "rounded": true,
    "mr-1": true,
    "mb-1": true,
    "outline-none": true,
    "data-[active-selection=true]:ring-2": true,
    "data-[active-selection=true]:ring-blue-500": true
  },
  "family:dropdown__tags": {
    "inline-flex": true,
    "flex-wrap": true,
    "items-center": true,
    "w-full": true,
    "-mb-1": true,
    "empty:mb-0": true
  },
  "family:dropdown__tag": {
    "flex": true,
    "items-center": true,
    "cursor-default": true,
    "rounded": true,
    "text-sm": true,
    "px-1.5": true,
    "py-0.5": true,
    "bg-blue-600": true,
    "text-white": true,
    "[&>[type=button]]:!w-[0.5em]": true,
    "[&>[type=button]]:aspect-[1/1]": true,
    "[&>[type=button]]:!text-inherit": true,
    "[&>[type=button]]:cursor-pointer": true,
    "group-data-[active-selection=true]/tag:bg-blue-400": true,
    "group-data-[active-selection=true]/tag:text-neutral-700": true
  },
  "family:dropdown__tagLabel": {
    "mr-1": true
  },
  "family:dropdown__emptyMessage": {
    "flex": true,
    "items-center": true,
    "px-2": true,
    "py-1.5": true,
    "first:pt-2": true,
    "last:pb-2": true,
    "text-neutral-700": true,
    "text-sm": true,
    "aria-selected:text-white": true,
    "aria-selected:bg-blue-600": true
  },
  "button__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "bg-blue-50": true,
    "hover:bg-blue-100": true,
    "dark:text-blue-500": true,
    "dark:bg-transparent": true,
    "dark:hover:bg-blue-50/5": true
  },
  "checkbox__decorator": {
    "rounded": true
  },
  "checkbox__decoratorIcon": {
    "max-w-[66.66%]": true
  },
  "color__inner": {
    "!w-auto": true,
    "!p-1.5": true,
    "!inline-flex": true,
    "group-data-[prefix-icon]:border": true,
    "group-data-[prefix-icon]:border-neutral-400": true,
    "group-data-[suffix-icon]:border": true,
    "group-data-[suffix-icon]:border-neutral-400": true,
    "dark:group-data-[prefix-icon]:border-neutral-500": true,
    "dark:group-data-[suffix-icon]:border-neutral-500": true
  },
  "color__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "!w-14": true,
    "bg-transparent": true,
    "cursor-pointer": true,
    "rounded": true,
    "overflow-clip": true,
    "[&::-webkit-color-swatch-wrapper]:p-0": true,
    "[&::-webkit-color-swatch]:border-none": true,
    "[&::-moz-color-swatch]:border-none": true,
    "group-data-[prefix-icon]:mx-2": true,
    "group-data-[suffix-icon]:mx-2": true
  },
  "color__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "group-data-[prefix-icon]:m-1.5": true,
    "group-data-[prefix-icon]:mr-0": true
  },
  "color__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "group-data-[suffix-icon]:m-1.5": true,
    "group-data-[prefix-icon]:ml-0": true
  },
  "date__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "focus:[&::-webkit-datetime-edit-day-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-blue-100": true
  },
  "datetime-local__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "focus:[&::-webkit-datetime-edit-day-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-hour-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-minute-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-ampm-field]:bg-blue-100": true
  },
  "file__fileList": {
    "group/list": true,
    "peer": true,
    "w-full": true,
    "min-w-0": true,
    "data-[has-multiple]:mb-[1.25em]": true
  },
  "file__fileItemIcon": {
    "h-[1em]": true,
    "w-[1em]": true,
    "mr-2": true,
    "shrink-0": true
  },
  "file__fileItem": {
    "flex": true,
    "min-w-0": true,
    "items-center": true,
    "text-neutral-700": true,
    "mb-1.5": true,
    "last:mb-0": true,
    "dark:text-neutral-300": true
  },
  "file__fileName": {
    "truncate": true,
    "min-w-0": true,
    "w-full": true,
    "shrink": true,
    "leading-5": true,
    "group-data-[has-multiple]/list:text-sm": true
  },
  "file__fileRemove": {
    "right-2": true,
    "ring-blue-500": true,
    "rounded": true,
    "z-20": true,
    "flex": true,
    "appearance-none": true,
    "items-center": true,
    "text-[0px]": true,
    "outline-none": true,
    "hover:!text-red-500": true,
    "focus-visible:ring-2": true,
    "group-data-[disabled]:pointer-events-none": true,
    "group-data-[disabled]:!text-neutral-500": true,
    "peer-data-[has-multiple]:absolute": true,
    "peer-data-[has-multiple]:bottom-[max(0.5em,8px)]": true,
    "peer-data-[has-multiple]:left-3": true,
    "peer-data-[has-multiple]:text-blue-600": true,
    "peer-data-[has-multiple]:text-xs": true,
    "peer-data-[has-multiple]:whitespace-nowrap": true,
    "group-data-[prefix-icon]:peer-data-[has-multiple]:left-2": true,
    "dark:hover:!text-red-400": true
  },
  "file__fileRemoveIcon": {
    "block": true,
    "text-base": true,
    "w-[0.75em]": true,
    "relative": true,
    "z-10": true
  },
  "file__inner": {
    "relative": true,
    "cursor-pointer": true,
    "group-data-[has-multiple]:rounded": true
  },
  "file__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "cursor-pointer": true,
    "text-transparent": true,
    "absolute": true,
    "inset-0": true,
    "opacity-0": true,
    "z-10": true,
    "file:pointer-events-none": true,
    "file:w-0": true,
    "file:h-0": true,
    "file:overflow-hidden": true
  },
  "file__noFiles": {
    "flex": true,
    "w-full": true,
    "items-center": true,
    "text-neutral-400": true,
    "dark:text-neutral-500": true
  },
  "file__noFilesIcon": {
    "w-[1em]": true,
    "mr-2": true
  },
  "form__form": {
    "group/form": true
  },
  "form__actions": {
    "": true
  },
  "form__summaryInner": {
    "group/summary": true,
    "border": true,
    "border-neutral-400": true,
    "bg-white": true,
    "rounded": true,
    "py-2": true,
    "px-3": true,
    "shadow": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-500": true
  },
  "form__summaryHeader": {
    "text-lg": true,
    "text-neutral-700": true,
    "font-bold": true,
    "mb-2": true,
    "dark:text-neutral-300": true
  },
  "form__messages": {
    "": true
  },
  "form__message": {
    "text-red-600": true,
    "mb-1.5": true,
    "text-xs": true,
    "dark:text-red-400": true,
    "group-[]/summary:text-sm": true
  },
  "form__messageLink": {
    "group-[]/summary:outline-none": true,
    "group-[]/summary:focus-visible:ring-2": true,
    "group-[]/summary:ring-blue-600": true
  },
  "month__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-blue-100": true
  },
  "radio__decorator": {
    "rounded-full": true
  },
  "radio__decoratorIcon": {
    "max-w-[50%]": true
  },
  "range__inner": {
    "relative": true,
    "!border-none": true,
    "!ring-0": true,
    "!px-0": true,
    "!bg-transparent": true,
    "!shadow-none": true
  },
  "range__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "group/input": true,
    "cursor-pointer": true,
    "[&::-webkit-slider-runnable-track]:bg-neutral-400/50": true,
    "[&::-webkit-slider-runnable-track]:h-[0.25em]": true,
    "[&::-webkit-slider-runnable-track]:rounded": true,
    "dark:[&::-webkit-slider-runnable-track]:bg-neutral-500/50": true,
    "[&::-webkit-slider-thumb]:appearance-none": true,
    "[&::-webkit-slider-thumb]:w-[0.85em]": true,
    "[&::-webkit-slider-thumb]:aspect-[1/1]": true,
    "[&::-webkit-slider-thumb]:bg-blue-600": true,
    "[&::-webkit-slider-thumb]:rounded-full": true,
    "[&::-webkit-slider-thumb]:relative": true,
    "[&::-webkit-slider-thumb]:top-1/2": true,
    "[&::-webkit-slider-thumb]:-translate-y-1/2": true,
    "[&::-webkit-slider-thumb]:group-data-[disabled]:bg-neutral-500": true,
    "[&::-webkit-slider-thumb]:group-data-[disabled]:!ring-neutral-300": true,
    "[&::-webkit-slider-thumb]:focus-visible:ring-2": true,
    "[&::-webkit-slider-thumb]:focus:!ring-blue-500": true,
    "[&::-webkit-slider-thumb]:focus:ring-offset-2": true,
    "[&::-webkit-slider-thumb]:shadow": true,
    "dark:[&::-webkit-slider-thumb]:group-data-[disabled]:!ring-neutral-600": true,
    "dark:[&::-webkit-slider-thumb]:focus:ring-offset-neutral-700": true,
    "[&::-moz-range-track]:bg-neutral-400/50": true,
    "[&::-moz-range-track]:h-[0.25]": true,
    "[&::-moz-range-track]:rounded": true,
    "dark:[&::-moz-range-track]:bg-neutral-500/50": true,
    "[&::-moz-range-thumb]:appearance-none": true,
    "[&::-moz-range-thumb]:border-none": true,
    "[&::-moz-range-thumb]:w-[0.85em]": true,
    "[&::-moz-range-thumb]:h-[0.85em]": true,
    "[&::-moz-range-thumb]:bg-blue-600": true,
    "[&::-moz-range-thumb]:rounded-full": true,
    "[&::-moz-range-thumb]:group-data-[disabled]:bg-neutral-500": true,
    "[&::-moz-range-thumb]:group-data-[disabled]:!ring-neutral-300": true,
    "[&::-moz-range-thumb]:focus-visible:ring-2": true,
    "[&::-moz-range-thumb]:focus:!ring-blue-500": true,
    "[&::-moz-range-thumb]:focus:ring-offset-2": true,
    "[&::-moz-range-thumb]:shadow": true,
    "dark:[&::-moz-range-thumb]:group-data-[disabled]:!ring-neutral-500": true,
    "dark:[&::-moz-range-thumb]:focus:ring-offset-neutral-700": true
  },
  "select__wrapper": {
    "mb-1.5": true
  },
  "select__inner": {
    "relative": true,
    "flex": true,
    "items-center": true,
    "bg-white": true,
    "border": true,
    "border-neutral-400": true,
    "rounded": true,
    "focus-within:ring-1": true,
    "focus-within:!ring-blue-500": true,
    "focus-within:!border-blue-500": true,
    "group-data-[invalid]:border-red-500": true,
    "group-data-[invalid]:ring-1": true,
    "group-data-[invalid]:ring-red-500": true,
    "group-data-[disabled]:bg-neutral-100": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "shadow": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "group-data-[multiple]:rounded": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-500": true,
    "dark:group-data-[disabled]:bg-neutral-800/5": true,
    "dark:group-data-[invalid]:border-red-500": true,
    "dark:group-data-[invalid]:ring-red-500": true
  },
  "select__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "grow": true,
    "p-2": true,
    "py-2": true,
    "px-3": true,
    "pr-[2em]": true,
    "text-base": true,
    "text-neutral-700": true,
    "text-ellipsis": true,
    "min-w-0": true,
    "outline-none": true,
    "bg-transparent": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "group-data-[prefix-icon]:!pl-0": true,
    "group-data-[suffix-icon]:!pr-0": true,
    "data-[placeholder]:text-neutral-400": true,
    "group-data-[multiple]:!p-0": true,
    "selection:bg-blue-100": true,
    "dark:data-[placeholder]:text-neutral-400/50": true,
    "dark:text-neutral-300": true,
    "border-none": true,
    "focus:ring-0": true,
    "bg-none": true
  },
  "select__selectIcon": {
    "absolute": true,
    "w-[1em]": true,
    "text-neutral-700": true,
    "pointer-events-none": true,
    "right-2": true,
    "group-data-[suffix-icon]:mr-[1.5em]": true,
    "dark:text-neutral-300": true
  },
  "select__optGroup": {
    "bg-white": true,
    "text-neutral-700": true,
    "group/optgroup": true,
    "group-data-[multiple]:px-1.5": true,
    "pt-1.5": true,
    "font-bold": true,
    "text-sm": true,
    "dark:bg-neutral-800": true,
    "dark:text-neutral-300": true
  },
  "select__option": {
    "bg-white": true,
    "text-neutral-700": true,
    "group-data-[disabled]:opacity-50": true,
    "group-data-[disabled]:select-none": true,
    "group-data-[multiple]:checked:bg-blue-100": true,
    "group-data-[multiple]:focus:bg-blue-100": true,
    "group-data-[multiple]:text-sm": true,
    "group-data-[multiple]:outline-none": true,
    "group-data-[multiple]:border-none": true,
    "group-data-[multiple]:py-1.5": true,
    "group-data-[multiple]:px-2": true,
    "dark:bg-neutral-800": true,
    "dark:text-neutral-300": true,
    "dark:group-data-[multiple]:focus:bg-blue-800": true,
    "dark:group-data-[multiple]:checked:bg-blue-800": true
  },
  "select__prefixIcon": {
    "flex": true,
    "items-center": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "ml-2": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "select__suffixIcon": {
    "flex": true,
    "items-center": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "mr-2": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "submit__outer": {
    "group": true,
    "max-w-[20em]": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "text-base": true,
    "data-[disabled]:opacity-100": true
  },
  "submit__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "bg-blue-600": true,
    "!text-white": true,
    "active:text-blue-100": true,
    "active:bg-blue-700": true,
    "hover:bg-blue-700": true,
    "disabled:border-neutral-400": true,
    "disabled:bg-neutral-400": true,
    "disabled:text-neutral-100": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "dark:disabled:border-neutral-100": true,
    "dark:disabled:bg-neutral-500": true,
    "dark:disabled:text-neutral-200": true,
    "dark:text-white": true,
    "dark:ring-offset-blue-500": true,
    "before:transition-all": true,
    "group-data-[loading=true]/form:before:content['']": true,
    "group-data-[loading=true]/form:before:block": true,
    "group-data-[loading=true]/form:before:animate-spin": true,
    "group-data-[loading=true]/form:before:w-5": true,
    "group-data-[loading=true]/form:before:h-5": true,
    "group-data-[loading=true]/form:before:rounded-full": true,
    "group-data-[loading=true]/form:before:mr-3": true,
    "group-data-[loading=true]/form:before:-ml-1.5": true,
    "group-data-[loading=true]/form:before:border-2": true,
    "group-data-[loading=true]/form:before:border-solid": true,
    "group-data-[loading=true]/form:before:border-white": true,
    "group-data-[loading=true]/form:before:border-r-transparent": true
  },
  "submit__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-100": true
  },
  "submit__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-100": true
  },
  "textarea__inner": {
    "flex": true,
    "items-center": true,
    "mb-1.5": true,
    "bg-white": true,
    "border": true,
    "border-neutral-400": true,
    "rounded": true,
    "focus-within:ring-1": true,
    "focus-within:!ring-blue-500": true,
    "focus-within:!border-blue-500": true,
    "group-data-[invalid]:border-red-500": true,
    "group-data-[invalid]:ring-1": true,
    "group-data-[invalid]:ring-red-500": true,
    "group-data-[disabled]:bg-neutral-100": true,
    "shadow": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "dark:border-neutral-500": true,
    "dark:group-data-[disabled]:bg-neutral-800/5": true,
    "dark:group-data-[invalid]:border-red-500": true,
    "dark:group-data-[invalid]:ring-red-500": true,
    "dark:bg-transparent": true
  },
  "textarea__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "text-base": true,
    "h-24": true,
    "text-neutral-700": true,
    "min-w-0": true,
    "grow": true,
    "shrink": true,
    "!py-2": true,
    "!px-3": true,
    "outline-none": true,
    "bg-transparent": true,
    "selection:bg-blue-100": true,
    "placeholder:text-neutral-400": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "dark:placeholder-neutral-400/50": true,
    "dark:text-neutral-300": true,
    "p-0": true,
    "border-none": true,
    "focus:ring-0": true
  },
  "textarea__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "!ml-2": true,
    "!mr-0": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "textarea__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "!mr-2": true,
    "!ml-0": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "time__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "focus:[&::-webkit-datetime-edit-hour-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-minute-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-ampm-field]:bg-blue-100": true
  },
  "week__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "focus:[&::-webkit-datetime-edit-week-field]:bg-blue-100": true,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-blue-100": true
  },
  "autocomplete__selections": {
    "flex": true,
    "absolute": true,
    "inset-0": true,
    "group-data-[multiple]:static": true,
    "group-data-[multiple]:block": true,
    "group-data-[empty]:hidden": true,
    "group-data-[multiple]:mt-1.5": true
  },
  "autocomplete__selectionWrapper": {
    "bg-neutral-100": true,
    "rounded": true,
    "group-data-[multiple]:border": true,
    "group-data-[multiple]:border-neutral-300": true,
    "group-data-[multiple]:mb-1.5": true,
    "outline-none": true,
    "data-[active-selection=true]:ring-2": true,
    "data-[active-selection=true]:ring-blue-500": true,
    "dark:bg-neutral-600": true,
    "dark:group-data-[multiple]:border-neutral-500": true,
    "[&.formkit-dropZone]:opacity-25": true,
    "[&.formkit-touchDropZone]:opacity-25": true,
    "[&.formkit-touchDragging]:!flex": true,
    "[&.formkit-longTouch]:opacity-25": true
  },
  "autocomplete__selection": {
    "rounded": true,
    "just": true,
    "pl-2": true,
    "[&>*]:ml-0": true,
    "dark:text-neutral-200": true
  },
  "colorpicker__outer": {
    "group": true,
    "max-w-[20em]": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true,
    "data-[disabled]:cursor-not-allowed": true,
    "data-[disabled]:pointer-events-none": true
  },
  "colorpicker__help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true,
    "group-data-[inline]:-mt-1": true,
    "group-data-[inline]:mb-2": true
  },
  "colorpicker__inner": {
    "relative": true,
    "inline-flex": true,
    "!w-auto": true,
    "pl-2": true,
    "group-data-[inline]:border-none": true,
    "group-data-[inline]:shadow-none": true,
    "group-data-[inline]:p-0": true,
    "group-data-[inline]:bg-transparent": true,
    "group-data-[inline]:outline-none": true,
    "group-data-[inline]:!ring-0": true,
    "group-data-[inline]:!w-full": true,
    "group-data-[inline]:rounded": true
  },
  "colorpicker__swatchPreview": {
    "w-full": true,
    "flex": true,
    "justify-start": true,
    "items-center": true,
    "rounded": true,
    "text-sm": true,
    "cursor-pointer": true,
    "outline-none": true
  },
  "colorpicker__canvasSwatchPreviewWrapper": {
    "relative": true,
    "before:content-['']": true,
    "before:absolute": true,
    "before:inset-0": true,
    "before:rounded": true,
    "before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": true,
    "before:z-[2]": true
  },
  "colorpicker__canvasSwatchPreview": {
    "text-base": true,
    "rounded": true,
    "aspect-[1/1]": true,
    "shrink-0": true,
    "grow": true,
    "!w-[1.5em]": true
  },
  "colorpicker__valueString": {
    "text-base": true,
    "text-neutral-700": true,
    "selection:bg-blue-100": true,
    "font-mono": true,
    "inline-block": true,
    "ml-2": true,
    "mr-1.5": true,
    "dark:text-neutral-300": true,
    "dark:selection:text-neutral-700": true
  },
  "colorpicker__panel": {
    "absolute": true,
    "left-0": true,
    "top-full": true,
    "z-[99]": true,
    "flex": true,
    "w-[100vw]": true,
    "max-w-[18.5em]": true,
    "touch-manipulation": true,
    "flex-col": true,
    "rounded": true,
    "border": true,
    "bg-white": true,
    "p-2": true,
    "shadow-md": true,
    "group-data-[inline]:static": true,
    "group-data-[inline]:max-w-none": true,
    "border-neutral-400": true,
    "group-data-[inline]:z-auto": true,
    "group-data-[inline]:w-full": true,
    "group-data-[inline]:shadow": true,
    "group-data-[inline]:group-data-[disabled]:!cursor-not-allowed": true,
    "group-data-[inline]:group-data-[disabled]:!pointer-events-none": true,
    "group-data-[inline]:[&:has([id^=swatches]:first-child:last-child)]:w-auto": true,
    "group-data-[inline]:[&:has([id^=swatches]:first-child:last-child)_[id^=swatches]>div]:w-[1.5em]": true,
    "dark:bg-neutral-800": true,
    "dark:border-neutral-500": true,
    "dark:group-data-[inline]:bg-transparent": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:!fixed": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:top-auto": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:max-w-none": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:bottom-0": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:left-0": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:rounded-none": true
  },
  "colorpicker__panelClose": {
    "flex": true,
    "justify-end": true,
    "items-center": true,
    "text-neutral-600": true,
    "mb-1.5": true,
    "-mt-1": true,
    "border-none": true,
    "bg-none": true,
    "border-b": true,
    "border-neutral-300": true,
    "w-[calc(100%+1rem)]": true,
    "-ml-2": true,
    "pt-0": true,
    "pr-2": true,
    "pb-1.5": true,
    "pl-2": true,
    "dark:border-neutral-600": true
  },
  "colorpicker__closeIcon": {
    "w-[2rem]": true,
    "aspect-[1/1]": true,
    "p-1": true,
    "rounded": true,
    "border": true,
    "[&>svg]:w-full": true,
    "[&>svg]:aspect-[1/1]": true,
    "[&>svg]:max-w-none": true,
    "[&>svg]:max-h-none": true
  },
  "colorpicker__controlGroup": {
    "grid": true,
    "[grid-template-areas:'a_a_a'_'b_c_e'_'b_d_e']": true,
    "mb-2": true
  },
  "colorpicker__LS": {
    "[grid-area:a]": true,
    "relative": true,
    "mb-2": true
  },
  "colorpicker__canvas": {
    "block": true,
    "w-full": true
  },
  "colorpicker__canvasLS": {
    "aspect-[2/1]": true,
    "cursor-pointer": true,
    "rounded-none": true
  },
  "colorpicker__canvasHue": {
    "rounded-none": true
  },
  "colorpicker__canvasAlpha": {
    "rounded-none": true
  },
  "colorpicker__preview": {
    "rounded": true,
    "after:rounded": true,
    "relative": true,
    "inline-flex": true,
    "aspect-[1/1]": true,
    "overflow-hidden": true,
    "[grid-area:b]": true,
    "mr-2": true,
    "after:absolute": true,
    "after:left-0": true,
    "after:top-0": true,
    "after:h-full": true,
    "after:w-full": true,
    "after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": true,
    "after:content-['']": true,
    "w-[2em]": true,
    "dark:after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]": true
  },
  "colorpicker__hue": {
    "[grid-area:c]": true,
    "relative": true,
    "inline-flex": true,
    "h-3/4": true
  },
  "colorpicker__alpha": {
    "[grid-area:d]": true,
    "relative": true,
    "inline-flex": true,
    "h-3/4": true
  },
  "colorpicker__eyeDropper": {
    "[grid-area:e]": true,
    "w-[2em]": true,
    "ml-2": true,
    "inline-flex": true,
    "self-center": true,
    "justify-center": true,
    "justify-self-center": true,
    "aspect-[1/1]": true,
    "rounded": true,
    "border": true,
    "border-neutral-300": true,
    "cursor-pointer": true,
    "content-center": true,
    "items-center": true,
    "text-neutral-600": true,
    "dark:border-neutral-600": true
  },
  "colorpicker__eyeDropperIcon": {
    "w-auto": true,
    "[&>svg]:w-[1em]": true,
    "dark:text-neutral-400": true
  },
  "colorpicker__control": {
    "absolute": true,
    "bg-white": true,
    "shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,0.2)]": true,
    "-translate-y-1/2": true,
    "-translate-x-1/2": true,
    "pointer-events-none": true,
    "data-[prevent-focus-style]:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,0.2)]": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-offset-2": true,
    "focus-visible:ring-blue-500": true
  },
  "colorpicker__controlLS": {
    "w-[10px]": true,
    "h-[10px]": true,
    "rounded-full": true
  },
  "colorpicker__controlHue": {
    "w-[4px]": true,
    "h-[calc(100%-2px)]": true,
    "top-1/2": true,
    "rounded": true
  },
  "colorpicker__controlAlpha": {
    "w-[4px]": true,
    "h-[calc(100%-2px)]": true,
    "top-1/2": true,
    "rounded": true
  },
  "colorpicker__formatField": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "grow": true
  },
  "colorpicker__colorField": {
    "bg-transparent": true,
    "text-neutral-700": true,
    "border": true,
    "border-neutral-300": true,
    "dark:border-neutral-600": true,
    "dark:text-neutral-300": true,
    "dark:selection:text-neutral-700": true
  },
  "colorpicker__colorInputGroup": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "grow": true
  },
  "colorpicker__fieldGroup": {
    "flex": true,
    "flex-col": true,
    "items-center": true,
    "justify-center": true,
    "w-full": true,
    "mr-1": true,
    "[&>input]:p-1": true,
    "[&>input]:text-sm": true,
    "[&>input]:text-neutral-700": true,
    "[&>input]:selection:bg-blue-100": true,
    "[&>input]:m-0": true,
    "[&>input]:grow": true,
    "[&>input]:shrink": true,
    "[&>input]:w-full": true,
    "[&>input]:border": true,
    "[&>input]:border-neutral-300": true,
    "[&>input]:rounded": true,
    "[&>input]:text-center": true,
    "[&>input]:appearance-none": true,
    "[&>input::-webkit-outer-spin-button]:appearance-none": true,
    "[&>input::-webkit-inner-spin-button]:appearance-none": true,
    "[&>input::-webkit-inner-spin-button]:m-0": true,
    "[&>input:focus]:outline-none": true,
    "[&>input:focus]:ring-1": true,
    "[&>input:focus]:ring-blue-600": true,
    "[&>input:focus]:border-blue-600": true,
    "max-[431px]:[&>input]:text-base": true
  },
  "colorpicker__fieldLabel": {
    "text-xs": true,
    "text-neutral-500": true,
    "mt-1.5": true,
    "dark:text-neutral-400": true
  },
  "colorpicker__formatSwitcher": {
    "flex": true,
    "justify-end": true,
    "self-start": true,
    "uppercase": true,
    "shrink-0": true,
    "p-1": true,
    "mt-0.5": true,
    "text-neutral-600": true,
    "rounded": true,
    "select-none": true,
    "dark:text-neutral-400": true
  },
  "colorpicker__switchIcon": {
    "[&>svg]:w-3": true
  },
  "colorpicker__swatches": {
    "inline-flex": true,
    "flex-wrap": true,
    "w-full": true,
    "justify-self-center": true,
    "min-w-0": true,
    "mx-auto": true,
    "px-[1px]": true,
    "pt-2": true,
    "pb-2": true,
    "mt-2": true,
    "-mb-2": true,
    "border-t": true,
    "border-neutral-300": true,
    "overflow-auto": true,
    "max-h-[200px]": true,
    "select-none": true,
    "first:-mt-[3px]": true,
    "first:last:-mb-[3px]": true,
    "first:last:pb-[2px]": true,
    "first:pt-px": true,
    "first:border-t-0": true,
    "dark:border-neutral-600": true
  },
  "colorpicker__swatchGroup": {
    "flex": true,
    "flex-wrap": true,
    "w-full": true,
    "mb-2": true,
    "last:mb-0": true
  },
  "colorpicker__swatchGroupLabel": {
    "ml-1": true,
    "block": true,
    "w-full": true,
    "text-sm": true,
    "text-neutral-500": true,
    "dark:text-neutral-400": true
  },
  "colorpicker__swatch": {
    "relative": true,
    "text-base": true,
    "w-[calc((100%/10)-0.5em)]": true,
    "max-w-[22px]": true,
    "m-[0.16em]": true,
    "cursor-pointer": true,
    "before:content-['']": true,
    "before:absolute": true,
    "before:inset-0": true,
    "before:rounded": true,
    "before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": true,
    "before:pointer-events-none": true,
    "before:z-[2]": true,
    "dark:before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]": true,
    "data-[active=true]:after:content-['']": true,
    "data-[active=true]:after:block": true,
    "data-[active=true]:after:absolute": true,
    "data-[active=true]:after:w-1.5": true,
    "data-[active=true]:after:h-1.5": true,
    "data-[active=true]:after:top-1/2": true,
    "data-[active=true]:after:left-1/2": true,
    "data-[active=true]:after:pointer-events-none": true,
    "data-[active=true]:after:rounded-full": true,
    "data-[active=true]:after:-translate-x-1/2": true,
    "data-[active=true]:after:-translate-y-1/2": true,
    "data-[active=true]:after:bg-white": true,
    "data-[active=true]:after:z-[2]": true,
    "data-[active=true]:after:ring-1": true,
    "data-[active=true]:after:ring-[rgba(0,0,0,0.33)]": true,
    "[&>canvas]:block": true,
    "[&>canvas]:w-full": true,
    "[&>canvas]:aspect-[1/1]": true,
    "[&>canvas]:rounded": true,
    "[&>canvas:focus-visible]:outline-none": true,
    "[&>canvas:focus-visible]:ring-2": true,
    "[&>canvas:focus-visible]:ring-blue-500": true,
    "[&>canvas:focus-visible]:ring-offset-2": true,
    "[&>canvas:focus-visible]:ring-offset-white": true,
    "dark:[&>canvas:focus-visible]:ring-offset-neutral-700": true
  },
  "datepicker__inner": {
    "relative": true
  },
  "datepicker__removeSelection": {
    "self-stretch": true,
    "text-base": true,
    "flex": true,
    "items-center": true,
    "ml-1": true,
    "mr-2": true,
    "text-neutral-700": true,
    "hover:text-red-400": true,
    "z-10": true,
    "dark:text-neutral-300": true
  },
  "datepicker__clearIcon": {
    "[&>svg]:w-[0.75em]": true
  },
  "datepicker__panelWrapper": {
    "group/panel": true,
    "absolute": true,
    "min-w-[20em]": true,
    "top-[calc(100%_+_0.5em)]": true,
    "left-0": true,
    "shadow-[0_0_1.25em_rgba(0,0,0,.25)]": true,
    "rounded": true,
    "p-4": true,
    "bg-white": true,
    "z-10": true,
    "dark:bg-neutral-800": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:!fixed": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:top-auto": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:max-w-none": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:bottom-0": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:left-0": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:rounded-none": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:w-full": true
  },
  "datepicker__panelHeader": {
    "grid": true,
    "grid-cols-[2.5em_1fr_2.5em]": true,
    "justify-center": true,
    "items-center": true,
    "border-b-2": true,
    "border-neutral-300": true,
    "mb-2": true,
    "pb-2.5": true,
    "dark:border-neutral-600": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:grid-cols-[2.5em_1fr_2.5em_2.5em]": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:group-data-[panel=time]/panel:grid-cols-[2.5em_1fr_2.5em]": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:group-data-[panel=month]/panel:grid-cols-[2.5em_1fr_2.5em]": true
  },
  "datepicker__panelClose": {
    "aspect-[1/1]": true,
    "border": true,
    "border-neutral-300": true,
    "rounded": true,
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "text-neutral-700": true,
    "[&_svg]:w-[1.25em]": true,
    "dark:text-neutral-300": true,
    "dark:border-neutral-600": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-data-[panel=time]/panel:col-start-3": true,
    "[@media(max-width:431px)_and_(hover:none)]:group-data-[panel=month]/panel:col-start-3": true
  },
  "datepicker__panel": {
    "flex": true,
    "justify-center": true
  },
  "datepicker__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "placeholder:text-neutral-400": true
  },
  "datepicker__monthsHeader": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "col-start-2": true,
    "col-end-2": true
  },
  "datepicker__timeHeader": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "col-start-2": true,
    "col-end-2": true
  },
  "datepicker__months": {
    "grid": true,
    "grid-cols-3": true,
    "w-full": true
  },
  "datepicker__month": {
    "m-1.5": true,
    "p-1.5": true,
    "text-center": true,
    "text-neutral-700": true,
    "rounded": true,
    "bg-neutral-200": true,
    "aria-selected:!bg-blue-600": true,
    "aria-selected:!text-white": true,
    "focus:outline": true,
    "focus:outline-2": true,
    "focus:outline-blue-600": true,
    "focus:outline-offset-2": true,
    "focus:bg-white": true,
    "focus:text-neutral-700": true,
    "data-[is-extra=true]:opacity-25": true,
    "group-data-[disabled=true]:opacity-50": true,
    "group-data-[disabled=true]:cursor-default": true,
    "group-data-[disabled=true]:pointer-events-none": true,
    "dark:bg-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "datepicker__yearsHeader": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "text-neutral-700": true,
    "col-start-2": true,
    "col-end-2": true,
    "dark:text-neutral-300": true
  },
  "datepicker__years": {
    "grid": true,
    "grid-cols-5": true,
    "w-full": true
  },
  "datepicker__year": {
    "text-base": true,
    "text-center": true,
    "text-neutral-700": true,
    "items-center": true,
    "m-1.5": true,
    "p-1.5": true,
    "rounded": true,
    "bg-neutral-200": true,
    "aria-selected:!bg-blue-600": true,
    "aria-selected:!text-white": true,
    "focus:outline": true,
    "focus:outline-2": true,
    "focus:outline-blue-600": true,
    "focus:outline-offset-2": true,
    "focus:bg-white": true,
    "data-[is-extra=true]:opacity-25": true,
    "group-data-[disabled=true]:opacity-50": true,
    "group-data-[disabled=true]:cursor-default": true,
    "group-data-[disabled=true]:pointer-events-none": true,
    "dark:bg-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "datepicker__weekDays": {
    "grid": true,
    "grid-cols-7": true
  },
  "datepicker__weekDay": {
    "w-[2.25em]": true,
    "text-neutral-700": true,
    "m-1.5": true,
    "rounded": true,
    "font-medium": true,
    "lowercase": true,
    "dark:text-neutral-500": true
  },
  "datepicker__calendarWeeks": {
    "": true
  },
  "datepicker__week": {
    "grid": true,
    "grid-cols-7": true,
    "group-data-[disabled=true]:opacity-50": true,
    "group-data-[disabled=true]:cursor-default": true,
    "group-data-[disabled=true]:pointer-events-none": true
  },
  "datepicker__dayCell": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "text-center": true,
    "text-neutral-700": true,
    "w-[2.25em]": true,
    "h-[2.25em]": true,
    "m-1": true,
    "p-2": true,
    "rounded": true,
    "bg-neutral-200": true,
    "aria-selected:bg-blue-600": true,
    "aria-selected:text-white": true,
    "focus:outline": true,
    "focus:outline-2": true,
    "focus:outline-blue-600": true,
    "focus:outline-offset-2": true,
    "focus:bg-white": true,
    "data-[is-extra=true]:opacity-25": true,
    "data-[disabled=true]:opacity-50": true,
    "data-[disabled=true]:cursor-default": true,
    "data-[disabled=true]:pointer-events-none": true,
    "dark:bg-neutral-600": true,
    "dark:text-neutral-300": true,
    "dark:aria-selected:bg-blue-600": true,
    "dark:aria-selected:text-white": true,
    "dark:focus:outline-blue-600": true,
    "dark:focus:bg-neutral-200": true,
    "dark:focus:text-neutral-700": true
  },
  "datepicker__timeInput": {
    "w-full": true,
    "border-2": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "text-neutral-700": true,
    "border-neutral-300": true,
    "rounded": true,
    "p-1.5": true,
    "my-2.5": true,
    "focus-visible:outline-blue-600": true,
    "dark:text-neutral-300": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-600": true
  },
  "datepicker__daysHeader": {
    "flex": true,
    "items-center": true,
    "justify-center": true
  },
  "datepicker__prev": {
    "mr-auto": true,
    "px-2.5": true,
    "py-0.5": true,
    "hover:bg-neutral-100": true,
    "rounded": true,
    "col-start-1": true,
    "col-end-1": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true
  },
  "datepicker__prevLabel": {
    "hidden": true
  },
  "datepicker__prevIcon": {
    "flex": true,
    "w-[0.75em]": true,
    "select-none": true,
    "text-neutral-700": true,
    "[&>svg]:w-full": true,
    "dark:text-neutral-300": true
  },
  "datepicker__dayButton": {
    "appearance-none": true,
    "text-neutral-700": true,
    "cursor-pointer": true,
    "px-2.5": true,
    "py-0.5": true,
    "border-2": true,
    "border-neutral-300": true,
    "rounded": true,
    "mx-1": true,
    "hover:border-blue-600": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true,
    "dark:text-neutral-300": true,
    "dark:border-neutral-600": true,
    "dark:hover:border-blue-500": true
  },
  "datepicker__monthButton": {
    "appearance-none": true,
    "text-neutral-700": true,
    "cursor-pointer": true,
    "px-2.5": true,
    "py-0.5": true,
    "border-2": true,
    "border-neutral-300": true,
    "rounded": true,
    "mx-1": true,
    "hover:border-blue-600": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true,
    "dark:text-neutral-300": true,
    "dark:border-neutral-600": true,
    "dark:hover:border-blue-500": true
  },
  "datepicker__yearButton": {
    "appearance-none": true,
    "text-neutral-700": true,
    "cursor-pointer": true,
    "px-2.5": true,
    "py-0.5": true,
    "border-2": true,
    "border-neutral-300": true,
    "rounded": true,
    "mx-1": true,
    "hover:border-blue-600": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true,
    "dark:text-neutral-300": true,
    "dark:border-neutral-600": true,
    "dark:hover:border-blue-500": true
  },
  "datepicker__next": {
    "ml-auto": true,
    "px-2.5": true,
    "py-0.5": true,
    "rounded": true,
    "hover:bg-neutral-100": true,
    "hover:rounded": true,
    "col-start-3": true,
    "col-end-3": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true
  },
  "datepicker__nextLabel": {
    "hidden": true
  },
  "datepicker__nextIcon": {
    "flex": true,
    "w-[0.75em]": true,
    "select-none": true,
    "text-neutral-700": true,
    "[&>svg]:w-full": true,
    "dark:text-neutral-300": true
  },
  "datepicker__openButton": {
    "appearance-none": true,
    "border-0": true,
    "bg-transparent": true,
    "flex": true,
    "p-0": true,
    "self-stretch": true,
    "cursor-pointer": true,
    "focus-visible:outline-none": true,
    "focus-visible:ring-2": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:ring-offset-2": true,
    "focus-visible:rounded": true
  },
  "datepicker__calendarIcon": {
    "text-neutral-600": true,
    "focus-visible:text-blue-600": true,
    "flex": true,
    "w-[1em]": true,
    "grow-0": true,
    "shrink-0": true,
    "self-stretch": true,
    "select-none": true,
    "[&>svg]:w-full": true,
    "[&>svg]:m-auto": true,
    "[&>svg]:max-h-[1em]": true,
    "[&>svg]:max-w-[1em]": true
  },
  "dropdown__placeholder": {
    "text-neutral-400": true,
    "grow": true,
    "dark:text-neutral-400/50": true
  },
  "dropdown__selector": {
    "flex": true,
    "grow": true,
    "justify-between": true,
    "w-full": true,
    "py-2": true,
    "pl-3": true,
    "pr-0": true,
    "text-base": true,
    "text-neutral-700": true,
    "text-left": true,
    "group-data-[disabled]:!cursor-not-allowed": true,
    "group-data-[prefix-icon]:!pl-0": true,
    "group-data-[suffix-icon]:!pr-0": true,
    "data-[placeholder]:text-neutral-400": true,
    "selection:bg-blue-100": true,
    "dark:data-[placeholder]:text-neutral-400/50": true,
    "dark:text-neutral-300": true
  },
  "dropdown__selectIcon": {
    "shrink-0": true
  },
  "dropdown__selectionsWrapper": {
    "w-[85%]": true,
    "overflow-hidden": true
  },
  "dropdown__selection": {
    "[&>*]:ml-0": true
  },
  "dropdown__selections": {
    "inline-flex": true,
    "items-center": true
  },
  "dropdown__selectionsItem": {
    "whitespace-nowrap": true,
    "mr-1": true
  },
  "dropdown__tagWrapper": {
    "[&.formkit-dropZone_.formkit-tag]:opacity-25": true,
    "[&.formkit-touchDropZone_.formkit-tag]:opacity-25": true
  },
  "dropdown__truncationCount": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "h-[1.5em]": true,
    "rounded": true,
    "bg-neutral-400": true,
    "text-white": true,
    "whitespace-nowrap": true,
    "text-[11px]": true,
    "[line-height:1em]": true,
    "tracking-tighter": true,
    "leading-0": true,
    "py-1": true,
    "px-1": true,
    "shrink-0": true,
    "my-auto": true
  },
  "mask__inner": {
    "relative": true
  },
  "mask__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "group-data-[has-overlay]:!caret-neutral-700": true,
    "dark:group-data-[has-overlay]:!caret-neutral-300": true
  },
  "rating__inner": {
    "text-neutral-300": true
  },
  "rating__itemsWrapper": {
    "relative": true,
    "inline-flex": true,
    "focus:border-blue-600": true
  },
  "rating__onItemRow": {
    "h-full": true,
    "w-full": true
  },
  "rating__offItemRow": {
    "h-full": true,
    "w-full": true
  },
  "rating__onItemWrapper": {
    "[&>*]:w-full": true,
    "[&>*]:h-full": true,
    "w-full": true,
    "h-full": true,
    "text-yellow-400": true
  },
  "rating__offItemWrapper": {
    "text-neutral-400": true,
    "w-full": true,
    "h-full": true,
    "[&>*]:w-full": true,
    "[&>*]:h-full": true,
    "dark:text-neutral-500": true
  },
  "rating__ratingItem": {
    "relative": true,
    "focus-within:outline": true,
    "focus-within:outline-blue-600": true,
    "w-[1.5em]": true,
    "h-[1.5em]": true
  },
  "rating__itemLabelInner": {
    "h-px": true,
    "w-px": true,
    "overflow-hidden": true,
    "absolute": true,
    "white-space-nowrap": true
  },
  "rating__itemLabel": {
    "absolute": true,
    "h-full": true
  },
  "rating__ratingIcon": {
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "flex": true
  },
  "rating__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "outline-none": true
  },
  "rating__messages": {
    "mt-1.5": true
  },
  "repeater__outer": {
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "text-base": true,
    "group/repeater": true,
    "max-w-full": true
  },
  "repeater__fieldset": {
    "min-w-0": true
  },
  "repeater__legend": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "dark:text-neutral-300": true,
    "mb-2": true
  },
  "repeater__content": {
    "min-w-0": true,
    "grow": true,
    "p-5": true,
    "flex": true,
    "flex-col": true,
    "align-center": true,
    "[&>div[data-type]]:max-w-none": true,
    "[&>div[data-type]:last-child]:mb-0": true
  },
  "repeater__addButton": {
    "!mb-0": true,
    "group-data-[disabled]/repeater:pointer-events-none": true,
    "group-data-[disabled]/repeater:opacity-50": true,
    "group-data-[disabled]/repeater:grayscale": true
  },
  "repeater__controlLabel": {
    "absolute": true,
    "opacity-0": true,
    "pointer-events-none": true,
    "text-[0px]": true
  },
  "repeater__controls": {
    "flex": true,
    "flex-col": true,
    "items-center": true,
    "justify-center": true,
    "bg-neutral-50": true,
    "p-2": true,
    "[&>li]:aspect-[1/1]": true,
    "dark:bg-neutral-800": true,
    "rounded": true,
    "rounded-tl-none": true,
    "rounded-bl-none": true
  },
  "repeater__downControl": {
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "my-1.5": true,
    "mx-auto": true,
    "flex": true,
    "items-center": true,
    "appearance-none": true,
    "justify-center": true,
    "aspect-[1/1]": true,
    "text-neutral-500": true,
    "hover:text-blue-600": true,
    "disabled:hover:text-inherit": true,
    "disabled:opacity-25": true,
    "disabled:!text-neutral-500": true,
    "dark:text-neutral-300": true,
    "dark:disabled:!text-neutral-300": true,
    "dark:hover:text-blue-500": true
  },
  "repeater__upControl": {
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "my-1.5": true,
    "mx-auto": true,
    "flex": true,
    "items-center": true,
    "appearance-none": true,
    "justify-center": true,
    "aspect-[1/1]": true,
    "text-neutral-500": true,
    "hover:text-blue-600": true,
    "disabled:hover:text-inherit": true,
    "disabled:opacity-25": true,
    "disabled:!text-neutral-500": true,
    "dark:text-neutral-300": true,
    "dark:disabled:!text-neutral-300": true,
    "dark:hover:text-blue-500": true
  },
  "repeater__removeControl": {
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "my-1.5": true,
    "mx-auto": true,
    "flex": true,
    "items-center": true,
    "appearance-none": true,
    "justify-center": true,
    "aspect-[1/1]": true,
    "text-neutral-500": true,
    "hover:text-blue-600": true,
    "disabled:hover:text-inherit": true,
    "disabled:opacity-25": true,
    "disabled:!text-neutral-500": true,
    "dark:text-neutral-300": true,
    "dark:disabled:!text-neutral-300": true,
    "dark:hover:text-blue-500": true
  },
  "repeater__insertControl": {
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "my-1.5": true,
    "mx-auto": true,
    "flex": true,
    "items-center": true,
    "appearance-none": true,
    "justify-center": true,
    "aspect-[1/1]": true,
    "text-neutral-500": true,
    "hover:text-blue-600": true,
    "disabled:hover:text-inherit": true,
    "disabled:opacity-25": true,
    "disabled:!text-neutral-500": true,
    "dark:text-neutral-300": true,
    "dark:disabled:!text-neutral-300": true,
    "dark:hover:text-blue-500": true
  },
  "repeater__help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true,
    "mb-2": true,
    "-mt-1": true
  },
  "repeater__item": {
    "flex": true,
    "relative": true,
    "w-full": true,
    "mb-2": true,
    "bg-white": true,
    "border": true,
    "border-neutral-300": true,
    "rounded": true,
    "shadow": true,
    "dark:border-neutral-600": true,
    "dark:bg-transparent": true,
    "[&.formkit-dropZone]:opacity-30": true,
    "[&.formkit-dropZone]:pointer-events-none": true,
    "[&.formkit-dropZone]:blur-[2px]": true
  },
  "repeater__dragHandleWrapper": {
    "relative": true,
    "w-8": true,
    "bg-neutral-50": true,
    "rounded": true,
    "rounded-tr-none": true,
    "rounded-br-none": true,
    "dark:bg-neutral-800": true
  },
  "repeater__dragHandle": {
    "w-full": true,
    "h-full": true,
    "flex": true,
    "absolute": true,
    "top-0": true,
    "left-0": true,
    "cursor-grab": true,
    "active:cursor-grabbing": true
  },
  "repeater__dragHandleIcon": {
    "w-2": true,
    "m-auto": true,
    "text-neutral-500": true,
    "dark:text-neutral-400": true,
    "[&>svg>path]:fill-current": true
  },
  "repeater__moveDownIcon": {
    "block": true,
    "w-[0.75em]": true,
    "aspect-[1/1]": true
  },
  "repeater__moveUpIcon": {
    "block": true,
    "w-[0.75em]": true,
    "aspect-[1/1]": true
  },
  "repeater__removeIcon": {
    "block": true,
    "w-[1.25em]": true,
    "aspect-[1/1]": true
  },
  "repeater__addIcon": {
    "block": true,
    "w-[1.25em]": true,
    "aspect-[1/1]": true
  },
  "slider__outer": {
    "group": true,
    "max-w-[20em]": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true,
    "data-[disabled]:pointer-events-none": true
  },
  "slider__help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true,
    "-mt-0.5": true,
    "mb-1.5": true
  },
  "slider__sliderInner": {
    "flex": true,
    "items-center": true,
    "[&>[data-type=number]]:mb-0": true,
    "[&>[data-type=number]]:ml-2.5": true,
    "[&>[data-type=number]]:shrink": true,
    "[&>[data-type=number]]:grow-0": true,
    "[&[data-has-mark-labels=true]_[id^=track]]:mb-5": true
  },
  "slider__track": {
    "grow": true,
    "relative": true,
    "z-20": true,
    "py-2.5": true,
    "select-none": true
  },
  "slider__trackWrapper": {
    "px-[2px]": true,
    "rounded-full": true,
    "bg-neutral-300": true,
    "dark:bg-neutral-500": true
  },
  "slider__trackInner": {
    "h-1.5": true,
    "mx-0.5": true,
    "relative": true
  },
  "slider__prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "slider__suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true,
    "text-neutral-600": true,
    "dark:text-neutral-300": true
  },
  "slider__fill": {
    "h-full": true,
    "rounded-full": true,
    "absolute": true,
    "top-0": true,
    "-mx-1": true,
    "bg-blue-600": true,
    "group-data-[disabled]:bg-neutral-500": true
  },
  "slider__marks": {
    "absolute": true,
    "pointer-events-none": true,
    "inset-0": true
  },
  "slider__mark": {
    "absolute": true,
    "top-1/2": true,
    "w-[3px]": true,
    "h-[3px]": true,
    "rounded-full": true,
    "-translate-x-1/2": true,
    "-translate-y-1/2": true,
    "bg-neutral-400": true,
    "data-[active=true]:bg-white": true
  },
  "slider__markLabel": {
    "absolute": true,
    "top-[calc(100%+0.5em)]": true,
    "left-1/2": true,
    "text-neutral-400": true,
    "text-xs": true,
    "-translate-x-1/2": true
  },
  "slider__handles": {
    "m-0": true,
    "p-0": true,
    "list-none": true
  },
  "slider__handle": {
    "group": true,
    "select-none": true,
    "w-4": true,
    "h-4": true,
    "rounded-full": true,
    "bg-white": true,
    "absolute": true,
    "top-1/2": true,
    "left-0": true,
    "z-30": true,
    "-translate-x-1/2": true,
    "-translate-y-1/2": true,
    "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.5)]": true,
    "focus-visible:outline-0": true,
    "focus-visible:ring-2": true,
    "ring-blue-600": true,
    "data-[is-target=true]:z-20": true,
    "dark:bg-neutral-200": true
  },
  "slider__tooltip": {
    "absolute": true,
    "bottom-full": true,
    "left-1/2": true,
    "-translate-x-1/2": true,
    "-translate-y-[4px]": true,
    "bg-blue-600": true,
    "text-white": true,
    "py-1": true,
    "px-1.5": true,
    "text-xs": true,
    "leading-none": true,
    "whitespace-nowrap": true,
    "rounded": true,
    "opacity-0": true,
    "pointer-events-none": true,
    "transition-opacity": true,
    'after:content-[""]': true,
    "after:absolute": true,
    "after:top-full": true,
    "after:left-1/2": true,
    "after:-translate-x-1/2": true,
    "after:-translate-y-[1px]": true,
    "after:border-4": true,
    "after:border-transparent": true,
    "after:border-t-blue-600": true,
    "group-hover:opacity-100": true,
    "group-focus-visible:opacity-100": true,
    "group-data-[show-tooltip=true]:opacity-100": true
  },
  "slider__linkedValues": {
    "flex": true,
    "items-start": true,
    "justify-between": true
  },
  "slider__minValue": {
    "grow": true,
    "!max-w-[45%]": true,
    "mb-0": true,
    "[&>div>div]:relative": true,
    '[&>div>div::after]:content-[""]': true,
    "[&>div>div::after]:absolute": true,
    "[&>div>div::after]:top-1/2": true,
    "[&>div>div::after]:left-[105.5%]": true,
    "[&>div>div::after]:w-[12%]": true,
    "[&>div>div::after]:h-[1px]": true,
    "[&>div>div::after]:bg-neutral-400": true,
    "dark:[&>div>div::after]:bg-neutral-500": true
  },
  "slider__maxValue": {
    "grow": true,
    "!max-w-[45%]": true,
    "mb-0": true,
    "relative": true
  },
  "slider__chart": {
    "relative": true,
    "z-20": true,
    "mb-2": true,
    "flex": true,
    "justify-between": true,
    "items-center": true,
    "w-full": true,
    "aspect-[3/1]": true
  },
  "slider__chartBar": {
    "absolute": true,
    "bottom-0": true,
    "h-full": true,
    "bg-neutral-400": true,
    "data-[active=false]:bg-neutral-300": true,
    "dark:bg-neutral-500": true,
    "dark:data-[active=false]:bg-neutral-600": true
  },
  "taglist__inner": {
    "py-2": true,
    "pr-0": true,
    "pl-0": true
  },
  "taglist__tags": {
    "pl-3": true
  },
  "taglist__tagWrapper": {
    "[&.formkit-dropZone_.formkit-tag]:opacity-25": true,
    "[&.formkit-touchDropZone_.formkit-tag]:opacity-25": true
  },
  "taglist__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "!p-0": true,
    "!w-[0%]": true,
    "min-w-[1em]": true,
    "inline-block": true,
    "-mt-1": true,
    "first:mt-0": true,
    "first:mb-1": true
  },
  "taglist__listboxButton": {
    "ml-auto": true,
    "shrink-0": true
  },
  "toggle__outer": {
    "group": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true,
    "max-w-none": true
  },
  "toggle__altLabel": {
    "block": true,
    "w-full": true,
    "mb-1.5": true,
    "font-bold": true,
    "text-xs": true,
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "toggle__inner": {
    "peer": true,
    "inline-block": true,
    "mr-2": true
  },
  "toggle__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "peer": true,
    "absolute": true,
    "opacity-0": true,
    "w-0": true,
    "h-0": true
  },
  "toggle__label": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "mb-1": true,
    "dark:text-neutral-300": true,
    "peer-first:font-normal": true,
    "peer-first:mb-0": true
  },
  "toggle__innerLabel": {
    "absolute": true,
    "text-neutral-200": true,
    "text-[10px]": true,
    "font-bold": true,
    "select-none": true,
    "left-full": true,
    "top-1/2": true,
    "-translate-x-full": true,
    "-translate-y-1/2": true,
    "px-1": true
  },
  "toggle__thumb": {
    "relative": true,
    "p-0.5": true,
    "left-0": true,
    "aspect-[1/1]": true,
    "rounded-full": true,
    "transition-all": true,
    "w-[1.25em]": true,
    "bg-neutral-50": true,
    "text-neutral-600": true,
    "shadow-base": true
  },
  "toggle__track": {
    "p-0.5": true,
    "min-w-[3em]": true,
    "relative": true,
    "cursor-pointer": true,
    "select-none": true,
    "rounded-full": true,
    "transition-all": true,
    "bg-neutral-400": true,
    "peer-checked:bg-blue-600": true,
    "peer-checked:[&>div:last-child]:left-full": true,
    "peer-checked:[&>div:last-child]:-translate-x-full": true,
    "peer-checked:[&>div:first-child:not(:last-child)]:left-0": true,
    "peer-checked:[&>div:first-child:not(:last-child)]:translate-x-0": true,
    "shadow-sm": true,
    "peer-focus-visible:ring-2": true,
    "peer-focus-visible:ring-blue-500": true,
    "peer-focus-visible:ring-offset-2": true,
    "dark:bg-neutral-500": true
  },
  "toggle__valueLabel": {
    "font-bold": true,
    "text-xs": true,
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "toggle__wrapper": {
    "flex": true,
    "flex-wrap": true,
    "items-center": true,
    "mb-1.5": true
  },
  "togglebuttons__wrapper": {
    "mb-1.5": true
  },
  "togglebuttons__options": {
    "group/options": true,
    "inline-flex": true,
    "data-[vertical=true]:flex-col": true
  },
  "togglebuttons__option": {
    "group/option": true
  },
  "togglebuttons__input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true,
    "!px-4": true,
    "!mb-0": true,
    "relative": true,
    "focus:z-10": true,
    "group-data-[vertical=true]/options:w-full": true,
    "justify-center": true,
    "bg-blue-50": true,
    "disabled:opacity-50": true,
    "disabled:cursor-not-allowed": true,
    "group-data-[disabled]:disabled:opacity-100": true,
    "dark:bg-transparent": true,
    "dark:disabled:bg-transparent": true,
    "dark:disabled:text-blue-500": true,
    "dark:text-blue-500": true,
    "aria-[pressed=true]:bg-blue-600": true,
    "aria-[pressed=true]:text-white": true,
    "dark:aria-[pressed=true]:bg-blue-600": true,
    "dark:aria-[pressed=true]:text-white": true,
    "group-[]/option:!rounded-none": true,
    "group-data-[vertical=false]/options:group-first/option:!rounded": true,
    "group-data-[vertical=true]/options:group-first/option:!rounded": true,
    "group-data-[vertical=false]/options:group-first/option:!rounded-tr-none": true,
    "group-data-[vertical=false]/options:group-first/option:!rounded-br-none": true,
    "group-data-[vertical=true]/options:group-first/option:!rounded-bl-none": true,
    "group-data-[vertical=true]/options:group-first/option:!rounded-br-none": true,
    "group-data-[vertical=false]/options:group-last/option:!rounded": true,
    "group-data-[vertical=true]/options:group-last/option:!rounded": true,
    "group-data-[vertical=false]/options:group-last/option:!rounded-tl-none": true,
    "group-data-[vertical=false]/options:group-last/option:!rounded-bl-none": true,
    "group-data-[vertical=true]/options:group-last/option:!rounded-tl-none": true,
    "group-data-[vertical=true]/options:group-last/option:!rounded-tr-none": true,
    "group-data-[vertical=false]/options:group-[]/option:!border-r-0": true,
    "group-data-[vertical=false]/options:group-last/option:!border-r": true,
    "group-data-[vertical=false]/options:group-[]/option:aria-[pressed=true]:border-x-blue-500": true,
    "group-data-[vertical=false]/options:group-first/option:aria-[pressed=true]:border-l-blue-600": true,
    "group-data-[vertical=false]/options:group-last/option:aria-[pressed=true]:border-r-blue-600": true,
    "dark:group-data-[vertical=false]/options:group-[]/option:aria-[pressed=true]:border-x-blue-600": true,
    "dark:group-data-[vertical=false]/options:group-first/option:aria-[pressed=true]:border-l-blue-600": true,
    "dark:group-data-[vertical=false]/options:group-last/option:aria-[pressed=true]:border-r-blue-600": true,
    "group-data-[vertical=true]/options:group-[]/option:!border-b-0": true,
    "group-data-[vertical=true]/options:group-last/option:!border-b": true,
    "group-data-[vertical=true]/options:group-[]/option:aria-[pressed=true]:border-y-blue-500": true,
    "group-data-[vertical=true]/options:group-first/option:aria-[pressed=true]:border-t-blue-600": true,
    "group-data-[vertical=true]/options:group-last/option:aria-[pressed=true]:border-b-blue-600": true,
    "dark:group-data-[vertical=true]/options:group-[]/option:aria-[pressed=true]:border-y-blue-600": true,
    "dark:group-data-[vertical=true]/options:group-first/option:aria-[pressed=true]:border-t-blue-600": true,
    "dark:group-data-[vertical=true]/options:group-last/option:aria-[pressed=true]:border-b-blue-600": true
  },
  "transferlist__outer": {
    "group": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true,
    "max-w-none": true,
    "[&_.dnd-placeholder]:bg-blue-600": true,
    "[&_.dnd-placeholder]:text-white": true
  },
  "transferlist__wrapper": {
    "flex": true,
    "flex-col": true,
    "sm:flex-row": true,
    "justify-between": true,
    "w-full": true,
    "max-w-none": true
  },
  "transferlist__help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true,
    "pb-2": true
  },
  "transferlist__transferlist": {
    "grow": true,
    "shrink": true,
    "min-w-0": true,
    "shadow": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "aspect-[4/5]": true,
    "flex": true,
    "flex-col": true,
    "h-[350px]": true,
    "border": true,
    "border-neutral-300": true,
    "rounded": true,
    "overflow-hidden": true,
    "select-none": true,
    "[&:has(:focus-visible)]:ring-1": true,
    "[&:has(:focus-visible)]:ring-blue-500": true,
    "dark:border-neutral-600": true,
    "dark:bg-neutral-900/50": true
  },
  "transferlist__transferlistHeader": {
    "flex": true,
    "bg-neutral-100": true,
    "text-neutral-600": true,
    "text-sm": true,
    "justify-between": true,
    "items-center": true,
    "border-b": true,
    "border-neutral-300": true,
    "py-2": true,
    "px-2.5": true,
    "dark:bg-neutral-700": true,
    "dark:border-neutral-600": true,
    "dark:text-neutral-400": true
  },
  "transferlist__transferlistHeaderItemCount": {
    "ml-auto": true,
    "text-xs": true,
    "min-w-[1.5em]": true,
    "[line-height:1.5em]": true,
    "px-2": true,
    "text-center": true,
    "rounded-xl": true,
    "bg-neutral-200": true,
    "text-neutral-700": true,
    "dark:bg-neutral-500": true,
    "dark:text-neutral-300": true
  },
  "transferlist__transferlistListItems": {
    "list-none": true,
    "bg-white": true,
    "h-full": true,
    "overflow-x-hidden": true,
    "overflow-y-auto": true,
    "dark:bg-transparent": true,
    "outline-none": true
  },
  "transferlist__transferlistListItem": {
    "py-2": true,
    "px-2": true,
    "text-neutral-700": true,
    "ring-1": true,
    "ring-neutral-200": true,
    "aria-selected:bg-blue-100": true,
    "data-[is-active=true]:bg-blue-100": true,
    "data-[is-active=true]:ring-blue-200": true,
    "aria-selected:ring-blue-200": true,
    "relative": true,
    "flex": true,
    "cursor-pointer": true,
    "items-center": true,
    "bg-white": true,
    "pl-[1.5em]": true,
    "first:-mt-px": true,
    "first:border-t": true,
    "aria-selected:z-[2]": true,
    "aria-selected:border-transparent": true,
    "aria-selected:ring-1": true,
    "data-[is-active=true]:z-[2]": true,
    "data-[is-active=true]:border-transparent": true,
    "data-[is-active=true]:ring-1": true,
    "group-data-[is-max=true]:cursor-not-allowed": true,
    "dark:bg-neutral-800": true,
    "dark:text-neutral-300": true,
    "dark:data-[is-active=true]:bg-blue-900": true,
    "dark:aria-selected:bg-blue-900": true,
    "dark:ring-neutral-700": true,
    "dark:data-[is-active=true]:ring-blue-600": true,
    "dark:aria-selected:ring-blue-600": true,
    "[&.formkit-dropZone]:bg-blue-100": true,
    "[&.formkit-selectionDropZone]:bg-blue-100": true,
    "[&.formkit-touchDropZone]:bg-blue-100": true,
    "[&.formkit-touchSelectionDropZone]:bg-blue-100": true,
    "[&.formkit-longTouch]:bg-blue-100": true,
    "dark:[&.formkit-dropZone]:bg-blue-900": true,
    "dark:[&.formkit-selectionDropZone]:bg-blue-900": true,
    "dark:[&.formkit-touchDropZone]:bg-blue-900": true,
    "dark:[&.formkit-touchSelectionDropZone]:bg-blue-900": true,
    "dark:[&.formkit-longTouch]:bg-blue-900": true
  },
  "transferlist__transferlistOption": {
    "text-sm": true
  },
  "transferlist__transferControls": {
    "inline-flex": true,
    "grow-0": true,
    "shrink": true,
    "border": true,
    "border-neutral-300": true,
    "flex-row": true,
    "sm:flex-col": true,
    "justify-center": true,
    "my-2": true,
    "sm:my-auto": true,
    "mx-auto": true,
    "sm:mx-2": true,
    "rounded": true,
    "overflow-clip": true,
    "shadow-none": true,
    "group-[]/repeater:shadow-none": true,
    "group-[]/multistep:shadow-none": true,
    "dark:border-neutral-800": true
  },
  "transferlist__sourceEmptyMessage": {
    "appearance-none": true,
    "border-none": true,
    "w-full": true,
    "my-2": true,
    "text-center": true,
    "text-neutral-500": true,
    "italic": true
  },
  "transferlist__sourceListItems": {
    "group-data-[is-max=true]:opacity-50": true
  },
  "transferlist__targetEmptyMessage": {
    "appearance-none": true,
    "border-none": true,
    "w-full": true,
    "my-2": true,
    "text-center": true,
    "text-neutral-500": true,
    "italic": true
  },
  "transferlist__emptyMessageInner": {
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "p-2": true,
    "text-sm": true
  },
  "transferlist__transferlistControls": {
    "bg-white": true,
    "p-2": true,
    "border-b": true,
    "border-neutral-200": true,
    "dark:bg-neutral-700": true,
    "dark:border-neutral-700": true
  },
  "transferlist__transferlistSearch": {
    "flex": true,
    "border": true,
    "border-neutral-300": true,
    "rounded": true,
    "items-center": true,
    "text-neutral-700": true,
    "selection:bg-blue-100": true,
    "dark:border-neutral-600": true,
    "dark:text-neutral-300": true,
    "dark:selection:bg-blue-100": true,
    "dark:selection:text-neutral-700": true,
    "dark:bg-neutral-800": true
  },
  "transferlist__transferlistSearchInput": {
    "border-none": true,
    "px-2": true,
    "py-1.5": true,
    "w-full": true,
    "bg-transparent": true,
    "outline-none": true,
    "text-sm": true
  },
  "transferlist__transferlistSearchClear": {
    "flex": true,
    "w-[0.75em]": true,
    "mr-2": true,
    "[&_svg]:w-full": true
  },
  "transferlist__controlLabel": {
    "absolute": true,
    "opacity-0": true,
    "pointer-events-none": true,
    "text-[0px]": true
  },
  "transferlist__selectedIcon": {
    "w-[0.75em]": true,
    "absolute": true,
    "left-[0.5em]": true,
    "select-none": true,
    "text-blue-600": true,
    "dark:text-blue-500": true
  },
  "transferlist__transferlistButton": {
    "sm:w-5": true,
    "relative": true,
    "flex": true,
    "justify-center": true,
    "text-sm": true,
    "shrink-0": true,
    "box-content": true,
    "text-neutral-700": true,
    "disabled:bg-neutral-200": true,
    "disabled:!text-neutral-400": true,
    "bg-neutral-50": true,
    "hover:text-blue-600": true,
    "cursor-pointer": true,
    "appearance-none": true,
    "border-none": true,
    "p-2.5": true,
    "hover:z-10": true,
    "disabled:cursor-not-allowed": true,
    "disabled:opacity-50": true,
    "disabled:hover:text-current": true,
    "disabled:hover:outline-none": true,
    "focus-visible:ring-1": true,
    "focus-visible:ring-blue-500": true,
    "focus-visible:z-10": true,
    "dark:bg-neutral-800": true,
    "dark:text-neutral-400": true,
    "dark:disabled:!text-neutral-600": true,
    "dark:disabled:bg-neutral-900": true,
    "dark:disabled:hover:text-current": true,
    "dark:disabled:hover:outline-none": true,
    "dark:hover:text-blue-500": true
  },
  "transferlist__fastForwardIcon": {
    "w-4": true,
    "flex": true,
    "select-none": true,
    "[&>svg]:m-auto": true,
    "[&>svg]:w-full": true,
    "[&>svg]:max-w-[1rem]": true,
    "[&>svg]:max-h-[1rem]": true,
    "rotate-90": true,
    "sm:rotate-0": true
  },
  "transferlist__moveRightIcon": {
    "w-4": true,
    "flex": true,
    "select-none": true,
    "[&>svg]:m-auto": true,
    "[&>svg]:w-full": true,
    "[&>svg]:max-w-[1rem]": true,
    "[&>svg]:max-h-[1rem]": true,
    "rotate-90": true,
    "sm:rotate-0": true
  },
  "transferlist__moveLeftIcon": {
    "w-4": true,
    "flex": true,
    "select-none": true,
    "[&>svg]:m-auto": true,
    "[&>svg]:w-full": true,
    "[&>svg]:max-w-[1rem]": true,
    "[&>svg]:max-h-[1rem]": true,
    "rotate-90": true,
    "sm:rotate-0": true
  },
  "transferlist__rewindIcon": {
    "w-4": true,
    "flex": true,
    "select-none": true,
    "[&>svg]:m-auto": true,
    "[&>svg]:w-full": true,
    "[&>svg]:max-w-[1rem]": true,
    "[&>svg]:max-h-[1rem]": true,
    "rotate-90": true,
    "sm:rotate-0": true
  },
  "transferlist__messages": {
    "mt-2": true
  },
  "barcode__barcodeIcon": {
    "w-[1.5em]": true,
    "text-neutral-700": true,
    "cursor-pointer": true,
    "dark:text-neutral-300": true
  },
  "barcode__dialog": {
    "border-none": true,
    "outline-none": true,
    "overflow-clip": true,
    "p-0": true,
    "bg-black": true,
    "rounded": true,
    "w-[100%-2rem]": true,
    "max-w-[30rem]": true,
    "[&::backdrop]:bg-neutral-800/50": true
  },
  "barcode__video": {
    "w-full": true,
    "aspect-[1/1]": true,
    "object-cover": true,
    "block": true,
    "pointer-events-none": true
  },
  "barcode__closeIcon": {
    "cursor-pointer": true,
    "absolute": true,
    "bg-white": true,
    "color-neutral-700": true,
    "w-[1.5em]": true,
    "h-[1.5em]": true,
    "rounded": true,
    "flex": true,
    "top-2": true,
    "right-2": true,
    "z-20": true,
    "[&>svg]:w-[1.25em]": true,
    "[&>svg]:h-[1.25em]": true,
    "[&>svg]:m-auto": true
  },
  "barcode__overlay": {
    "text-neutral-700": true,
    "dark:text-neutral-300": true,
    "absolute": true,
    "top-1/2": true,
    "left-1/2": true,
    "w-[min(20em,75%)]": true,
    "aspect-[1/1]": true,
    "-translate-x-1/2": true,
    "-translate-y-1/2": true,
    "rounded": true,
    "pointer-events-none": true,
    "shadow-[0_0_0_999em_rgba(0,0,0,0.5)]": true
  },
  "barcode__overlayDecorators": {
    "absolute": true,
    "inset-0": true,
    "z-10": true
  },
  "barcode__overlayDecoratorTopLeft": {
    "absolute": true,
    "w-[1.5rem]": true,
    "h-[1.5rem]": true,
    "rounded": true,
    "top-0": true,
    "left-0": true,
    "border-l-4": true,
    "border-t-4": true,
    "rounded-tr-none": true,
    "rounded-bl-none": true
  },
  "barcode__overlayDecoratorTopRight": {
    "absolute": true,
    "w-[1.5rem]": true,
    "h-[1.5rem]": true,
    "rounded": true,
    "top-0": true,
    "right-0": true,
    "border-r-4": true,
    "border-t-4": true,
    "rounded-tl-none": true,
    "rounded-br-none": true
  },
  "barcode__overlayDecoratorBottomRight": {
    "absolute": true,
    "w-[1.5rem]": true,
    "h-[1.5rem]": true,
    "rounded": true,
    "bottom-0": true,
    "right-0": true,
    "border-r-4": true,
    "border-b-4": true,
    "rounded-tr-none": true,
    "rounded-bl-none": true
  },
  "barcode__overlayDecoratorBottomLeft": {
    "absolute": true,
    "w-[1.5rem]": true,
    "h-[1.5rem]": true,
    "rounded": true,
    "bottom-0": true,
    "left-0": true,
    "border-l-4": true,
    "border-b-4": true,
    "rounded-tl-none": true,
    "rounded-br-none": true
  },
  "multi-step__outer": {
    "group": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true,
    "group/multistep": true,
    "max-w-[32rem]": true
  },
  "multi-step__wrapper": {
    "group/wrapper": true,
    "data-[tab-style=tab]:shadow": true,
    "data-[tab-style=tab]:rounded": true
  },
  "multi-step__tabs": {
    "flex": true,
    "items-center": true,
    "group-data-[tab-style=tab]/wrapper:overflow-auto": true,
    "group-data-[tab-style=tab]/wrapper:border": true,
    "group-data-[tab-style=tab]/wrapper:border-b-0": true,
    "group-data-[tab-style=tab]/wrapper:border-neutral-300": true,
    "group-data-[tab-style=tab]/wrapper:rounded": true,
    "group-data-[tab-style=tab]/wrapper:rounded-bl-none": true,
    "group-data-[tab-style=tab]/wrapper:rounded-br-none": true,
    "dark:group-data-[tab-style=tab]/wrapper:border-neutral-600": true,
    "group-data-[tab-style=progress]/wrapper:my-6": true,
    "group-data-[tab-style=progress]/wrapper:justify-around": true,
    "group-data-[tab-style=progress]/wrapper:overflow-visible": true,
    "group-data-[tab-style=progress]/wrapper:group-data-[hide-labels=true]/wrapper:mb-3.5": true
  },
  "multi-step__tab": {
    "group/tab": true,
    "group-data-[tab-style=tab]/wrapper:relative": true,
    "group-data-[tab-style=tab]/wrapper:flex": true,
    "group-data-[tab-style=tab]/wrapper:grow": true,
    "group-data-[tab-style=tab]/wrapper:text-sm": true,
    "group-data-[tab-style=tab]/wrapper:items-center": true,
    "group-data-[tab-style=tab]/wrapper:justify-center": true,
    "group-data-[tab-style=tab]/wrapper:cursor-pointer": true,
    "group-data-[tab-style=tab]/wrapper:text-neutral-700": true,
    "group-data-[tab-style=tab]/wrapper:bg-neutral-100": true,
    "group-data-[tab-style=tab]/wrapper:py-3.5": true,
    "group-data-[tab-style=tab]/wrapper:px-4": true,
    "group-data-[tab-style=tab]/wrapper:border-r": true,
    "group-data-[tab-style=tab]/wrapper:border-b": true,
    "group-data-[tab-style=tab]/wrapper:border-neutral-300": true,
    "group-data-[tab-style=tab]/wrapper:last:border-r-0": true,
    "group-data-[tab-style=tab]/wrapper:shadow-[inset_0_-0.5em_0.5em_-0.5em_rgba(0,0,0,0.1)]": true,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:bg-white": true,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:font-bold": true,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:border-b-white": true,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:z-10": true,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:shadow-[0_0_0.5em_0_rgba(0,0,0,0.1)]": true,
    "dark:group-data-[tab-style=tab]/wrapper:text-neutral-300": true,
    "dark:group-data-[tab-style=tab]/wrapper:bg-neutral-950/20": true,
    "dark:group-data-[tab-style=tab]/wrapper:data-[active=true]:bg-transparent": true,
    "dark:group-data-[tab-style=tab]/wrapper:data-[active=true]:border-b-transparent": true,
    "dark:group-data-[tab-style=tab]/wrapper:border-neutral-600": true,
    "group-data-[tab-style=progress]/wrapper:flex": true,
    "group-data-[tab-style=progress]/wrapper:flex-col": true,
    "group-data-[tab-style=progress]/wrapper:items-center": true,
    "group-data-[tab-style=progress]/wrapper:grow": true,
    "group-data-[tab-style=progress]/wrapper:shrink-0": true,
    "group-data-[tab-style=progress]/wrapper:relative": true,
    "group-data-[tab-style=progress]/wrapper:before:block": true,
    "group-data-[tab-style=progress]/wrapper:before:text-sm": true,
    "group-data-[tab-style=progress]/wrapper:before:w-[1.25rem]": true,
    "group-data-[tab-style=progress]/wrapper:before:h-[1.25rem]": true,
    "group-data-[tab-style=progress]/wrapper:before:border-4": true,
    "group-data-[tab-style=progress]/wrapper:before:border-neutral-300": true,
    "group-data-[tab-style=progress]/wrapper:before:rounded-full": true,
    "group-data-[tab-style=progress]/wrapper:before:bg-white": true,
    "group-data-[tab-style=progress]/wrapper:before:z-10": true,
    "dark:group-data-[tab-style=progress]/wrapper:before:border-neutral-600": true,
    "dark:group-data-[tab-style=progress]/wrapper:before:bg-neutral-950": true,
    "group-data-[tab-style=progress]/wrapper:after:block": true,
    "group-data-[tab-style=progress]/wrapper:after:h-1": true,
    "group-data-[tab-style=progress]/wrapper:after:w-full": true,
    "group-data-[tab-style=progress]/wrapper:after:absolute": true,
    "group-data-[tab-style=progress]/wrapper:after:top-[0.5em]": true,
    "group-data-[tab-style=progress]/wrapper:after:left-[calc(50%+0.5em)]": true,
    "group-data-[tab-style=progress]/wrapper:after:bg-neutral-300": true,
    "group-data-[tab-style=progress]/wrapper:data-[valid=true]:data-[visited=true]:after:bg-blue-600": true,
    "group-data-[tab-style=progress]/wrapper:last:after:hidden": true,
    "dark:group-data-[tab-style=progress]/wrapper:after:bg-neutral-600": true,
    "dark:group-data-[tab-style=progress]/wrapper:data-[valid=true]:data-[visited=true]:after:bg-blue-600": true
  },
  "multi-step__tabLabel": {
    "group-data-[tab-style=progress]/wrapper:absolute": true,
    "group-data-[tab-style=progress]/wrapper:text-neutral-800": true,
    "group-data-[tab-style=progress]/wrapper:top-full": true,
    "group-data-[tab-style=progress]/wrapper:w-full": true,
    "group-data-[tab-style=progress]/wrapper:whitespace-nowrap": true,
    "group-data-[tab-style=progress]/wrapper:text-xs": true,
    "dark:group-data-[tab-style=progress]/wrapper:text-neutral-300": true
  },
  "multi-step__badge": {
    "bg-red-600": true,
    "absolute": true,
    "font-mono": true,
    "font-bold": true,
    "flex": true,
    "items-center": true,
    "justify-center": true,
    "aspect-[1/1]": true,
    "[line-height:1.25rem]": true,
    "text-white": true,
    "rounded-full": true,
    "group-data-[valid=true]/tab:bg-blue-600": true,
    "group-data-[tab-style=tab]/wrapper:text-[0.66rem]": true,
    "group-data-[tab-style=tab]/wrapper:p-1.5": true,
    "group-data-[tab-style=tab]/wrapper:w-5": true,
    "group-data-[tab-style=tab]/wrapper:h-5": true,
    "group-data-[tab-style=tab]/wrapper:top-1.5": true,
    "group-data-[tab-style=tab]/wrapper:right-1.5": true,
    "group-data-[tab-style=progress]/wrapper:w-[1.25rem]": true,
    "group-data-[tab-style=progress]/wrapper:h-[1.25rem]": true,
    "group-data-[tab-style=progress]/wrapper:p-1": true,
    "group-data-[tab-style=progress]/wrapper:text-[10px]": true,
    "group-data-[tab-style=progress]/wrapper:[line-height:0]": true,
    "group-data-[tab-style=progress]/wrapper:z-10": true
  },
  "multi-step__validStepIcon": {
    "w-full": true,
    "h-full": true,
    "mt-0.5": true
  },
  "multi-step__steps": {
    "px-10": true,
    "pt-8": true,
    "pb-4": true,
    "bg-white": true,
    "border": true,
    "border-neutral-300": true,
    "rounded": true,
    "dark:bg-transparent": true,
    "dark:border-neutral-600": true,
    "group-data-[tab-style=tab]/wrapper:border-t-0": true,
    "group-data-[tab-style=tab]/wrapper:rounded-tl-none": true,
    "group-data-[tab-style=tab]/wrapper:rounded-tr-none": true,
    "group-data-[tab-style=progress]/wrapper:shadow": true,
    "[&_[data-type]]:max-w-none": true
  },
  "step__stepActions": {
    "flex": true,
    "justify-between": true,
    "[&>*]:grow-0": true
  },
  "step__stepPrevious": {
    "mr-1.5": true
  },
  "step__stepNext": {
    "ml-auto": true
  }
};
const globals = {
  "outer": {
    "group": true,
    "max-w-[20em]": true,
    "min-w-0": true,
    "grow": true,
    "mb-4": true,
    "data-[disabled]:select-none": true,
    "data-[disabled]:opacity-50": true,
    "text-base": true
  },
  "label": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "mb-1": true,
    "dark:text-neutral-300": true
  },
  "legend": {
    "block": true,
    "text-neutral-700": true,
    "text-sm": true,
    "font-bold": true,
    "dark:text-neutral-300": true
  },
  "input": {
    "appearance-none": true,
    "[color-scheme:light]": true,
    "dark:[color-scheme:dark]": true,
    "selection:bg-blue-100": true,
    "selection:text-neutral-700": true,
    "group-data-[has-overlay]:selection:!text-transparent": true
  },
  "prefixIcon": {
    "flex": true,
    "items-center": true,
    "-ml-1": true,
    "mr-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true
  },
  "suffixIcon": {
    "flex": true,
    "items-center": true,
    "-mr-1": true,
    "ml-2": true,
    "text-base": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true
  },
  "loaderIcon": {
    "animate-spin": true,
    "flex": true,
    "items-center": true,
    "my-auto": true,
    "ml-2": true,
    "text-base": true,
    "text-neutral-500": true,
    "h-[1em]": true,
    "w-[1em]": true,
    "shrink-0": true,
    "[&>svg]:w-full": true
  },
  "loadMoreInner": {
    "flex": true,
    "text-sm": true,
    "text-neutral-500": true,
    "p-2": true,
    "items-center": true,
    "justify-center": true,
    "[&>span]:mr-2": true
  },
  "help": {
    "text-neutral-500": true,
    "text-xs": true,
    "dark:text-neutral-400": true
  },
  "message": {
    "text-red-600": true,
    "mb-1.5": true,
    "text-xs": true,
    "dark:text-red-400": true
  },
  "overlay": {
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "overlayPlaceholder": {
    "text-neutral-400": true,
    "dark:text-neutral-400/50": true
  },
  "overlayLiteral": {
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "overlayChar": {
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  },
  "overlayEnum": {
    "text-neutral-700": true,
    "dark:text-neutral-300": true
  }
};
const pro = createProPlugin("fk-9d725c72ec", inputs);
const fkConfig = defaultConfig({
  locale: "en",
  locales: {
    pt: pt$1,
    en
  },
  plugins: [
    pro
  ],
  config: {
    rootClasses
  },
  icons: {
    ...genesisIcons
  }
});
const laravext = () => {
  return window.__laravext;
};
const laravextPageData = () => {
  return laravext().page_data;
};
const nexus = () => {
  return laravextPageData().nexus;
};
const nexusProps = () => {
  return nexus().props;
};
const sharedProps = () => {
  return laravextPageData().shared_props;
};
const routeParams = () => {
  return laravextPageData().route_params;
};
const Head = defineComponent({
  props: {
    title: String
  },
  mounted() {
    if (this.title) {
      document.title = this.title;
    }
  },
  render() {
    return null;
  }
});
async function createLaravextSsrApp({ nexusResolver, strandsResolver, uses = () => [], conventions = [
  "error",
  "layout",
  "middleware"
], laravext: laravext2, document: document2, render }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  if (nexusResolver) {
    const nexusComponentPath = (_c = (_b = (_a = laravext2.page_data) == null ? void 0 : _a.nexus) == null ? void 0 : _b.page) == null ? void 0 : _c.replaceAll("\\", "/");
    const nexusTags = findNexus(document2);
    for (let i2 = 0; i2 < nexusTags.length; i2++) {
      let nexusElement = nexusTags[i2];
      if (nexusComponentPath) {
        let NexusComponent = await nexusResolver(nexusComponentPath);
        if (!isEnvProduction()) {
          console.debug(`Loading page at ${nexusComponentPath}`);
          console.debug(`Page at ${nexusComponentPath} loaded successfully`);
        }
        let pageComponent = NexusComponent.default;
        let renderer = () => h$1(pageComponent, { laravext: laravext2.page_data }, {
          props: () => ({
            laravext: laravext2.page_data
          })
        });
        conventions = conventions.filter((convention) => convention !== "page");
        for (let i3 = 0; i3 < conventions.length; i3++) {
          if ((_e = (_d = laravext2.page_data) == null ? void 0 : _d.nexus) == null ? void 0 : _e[conventions[i3]]) {
            try {
              if (!isEnvProduction()) {
                console.debug(`Loading convention ${conventions[i3]} at ${(_g = (_f = laravext2.page_data) == null ? void 0 : _f.nexus) == null ? void 0 : _g[conventions[i3]]}`);
              }
              ;
              let conventionComponent = (await nexusResolver((_i = (_h = laravext2.page_data) == null ? void 0 : _h.nexus) == null ? void 0 : _i[conventions[i3]])).default;
              if (!isEnvProduction()) {
                console.debug(`Convention ${conventions[i3]} at ${(_k = (_j = laravext2.page_data) == null ? void 0 : _j.nexus) == null ? void 0 : _k[conventions[i3]]} loaded successfully`);
              }
              const previousRenderer = renderer;
              renderer = () => h$1(conventionComponent, { laravext: laravext2.page_data }, {
                default: () => previousRenderer(),
                props: () => ({
                  laravext: laravext2.page_data
                })
              });
            } catch (error) {
              console.error(`Error loading convention ${conventions[i3]} at ${(_m = (_l = laravext2.page_data) == null ? void 0 : _l.nexus) == null ? void 0 : _m[conventions[i3]]}:`, error);
            }
          }
        }
        const rootComponent = defineComponent({
          render() {
            return renderer();
          }
        });
        const app2 = createSSRApp(rootComponent);
        for (let use of uses()) {
          app2.use(use.plugin, use.options ?? {});
        }
        let renderedComponent = render ? await render(app2) : await renderToString(app2);
        nexusElement.innerHTML = renderedComponent;
      }
    }
  }
}
function findNexus(doc = null) {
  if (typeof window !== "undefined") {
    doc = document;
  }
  const nexusSection = doc.querySelectorAll('section[section-type="laravext-nexus-section"]');
  return nexusSection;
}
async function resolveComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
function isEnvProduction() {
  return !["development", "local"].includes("local");
}
class Route {
  /**
   * @param {String} name - Route name.
   * @param {Object} definition - Route definition.
   * @param {Object} config - Ziggy configuration.
   */
  constructor(name, definition, config) {
    this.name = name;
    this.definition = definition;
    this.bindings = definition.bindings ?? {};
    this.wheres = definition.wheres ?? {};
    this.config = config;
  }
  /**
   * Get a 'template' of the complete URL for this route.
   *
   * @example
   * https://{team}.ziggy.dev/user/{user}
   *
   * @return {String} Route template.
   */
  get template() {
    const template = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return template === "" ? "/" : template;
  }
  /**
   * Get a template of the origin for this route.
   *
   * @example
   * https://{team}.ziggy.dev/
   *
   * @return {String} Route origin template.
   */
  get origin() {
    return !this.config.absolute ? "" : this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url;
  }
  /**
   * Get an array of objects representing the parameters that this route accepts.
   *
   * @example
   * [{ name: 'team', required: true }, { name: 'user', required: false }]
   *
   * @return {Array} Parameter segments.
   */
  get parameterSegments() {
    var _a;
    return ((_a = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : _a.map((segment) => ({
      name: segment.replace(/{|\??}/g, ""),
      required: !/\?}$/.test(segment)
    }))) ?? [];
  }
  /**
   * Get whether this route's template matches the given URL.
   *
   * @param {String} url - URL to check.
   * @return {Object|false} - If this route matches, returns the matched parameters.
   */
  matchesUrl(url) {
    if (!this.definition.methods.includes("GET"))
      return false;
    const pattern = this.template.replace(/(\/?){([^}?]*)(\??)}/g, (_, slash, segment, optional) => {
      var _a;
      const regex = `(?<${segment}>${((_a = this.wheres[segment]) == null ? void 0 : _a.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return optional ? `(${slash}${regex})?` : `${slash}${regex}`;
    }).replace(/^\w+:\/\//, "");
    const [location, query] = url.replace(/^\w+:\/\//, "").split("?");
    const matches = new RegExp(`^${pattern}/?$`).exec(decodeURI(location));
    if (matches) {
      for (const k2 in matches.groups) {
        matches.groups[k2] = typeof matches.groups[k2] === "string" ? decodeURIComponent(matches.groups[k2]) : matches.groups[k2];
      }
      return { params: matches.groups, query: parse(query) };
    }
    return false;
  }
  /**
   * Hydrate and return a complete URL for this route with the given parameters.
   *
   * @param {Object} params
   * @return {String}
   */
  compile(params) {
    const segments = this.parameterSegments;
    if (!segments.length)
      return this.template;
    return this.template.replace(/{([^}?]+)(\??)}/g, (_, segment, optional) => {
      if (!optional && [null, void 0].includes(params[segment])) {
        throw new Error(
          `Ziggy error: '${segment}' parameter is required for route '${this.name}'.`
        );
      }
      if (this.wheres[segment]) {
        if (!new RegExp(
          `^${optional ? `(${this.wheres[segment]})?` : this.wheres[segment]}$`
        ).test(params[segment] ?? "")) {
          throw new Error(
            `Ziggy error: '${segment}' parameter '${params[segment]}' does not match required format '${this.wheres[segment]}' for route '${this.name}'.`
          );
        }
      }
      return encodeURI(params[segment] ?? "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "");
  }
}
class Router extends String {
  /**
   * @param {String} [name] - Route name.
   * @param {(String|Number|Array|Object)} [params] - Route parameters.
   * @param {Boolean} [absolute] - Whether to include the URL origin.
   * @param {Object} [config] - Ziggy configuration.
   */
  constructor(name, params, absolute = true, config) {
    super();
    this._config = config ?? (typeof Ziggy !== "undefined" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy);
    this._config = { ...this._config, absolute };
    if (name) {
      if (!this._config.routes[name]) {
        throw new Error(`Ziggy error: route '${name}' is not in the route list.`);
      }
      this._route = new Route(name, this._config.routes[name], this._config);
      this._params = this._parse(params);
    }
  }
  /**
   * Get the compiled URL string for the current route and parameters.
   *
   * @example
   * // with 'posts.show' route 'posts/{post}'
   * (new Router('posts.show', 1)).toString(); // 'https://ziggy.dev/posts/1'
   *
   * @return {String}
   */
  toString() {
    const unhandled = Object.keys(this._params).filter((key) => !this._route.parameterSegments.some(({ name }) => name === key)).filter((key) => key !== "_query").reduce((result, current) => ({ ...result, [current]: this._params[current] }), {});
    return this._route.compile(this._params) + stringify(
      { ...unhandled, ...this._params["_query"] },
      {
        addQueryPrefix: true,
        arrayFormat: "indices",
        encodeValuesOnly: true,
        skipNulls: true,
        encoder: (value, encoder) => typeof value === "boolean" ? Number(value) : encoder(value)
      }
    );
  }
  /**
   * Get the parameters, values, and metadata from the given URL.
   *
   * @param {String} [url] - The URL to inspect, defaults to the current window URL.
   * @return {{ name: string, params: Object, query: Object, route: Route }}
   */
  _unresolve(url) {
    if (!url) {
      url = this._currentUrl();
    } else if (this._config.absolute && url.startsWith("/")) {
      url = this._location().host + url;
    }
    let matchedParams = {};
    const [name, route2] = Object.entries(this._config.routes).find(
      ([name2, route3]) => matchedParams = new Route(name2, route3, this._config).matchesUrl(url)
    ) || [void 0, void 0];
    return { name, ...matchedParams, route: route2 };
  }
  _currentUrl() {
    const { host, pathname, search } = this._location();
    return (this._config.absolute ? host + pathname : pathname.replace(this._config.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + search;
  }
  /**
   * Get the name of the route matching the current window URL, or, given a route name
   * and parameters, check if the current window URL and parameters match that route.
   *
   * @example
   * // at URL https://ziggy.dev/posts/4 with 'posts.show' route 'posts/{post}'
   * route().current(); // 'posts.show'
   * route().current('posts.index'); // false
   * route().current('posts.show'); // true
   * route().current('posts.show', { post: 1 }); // false
   * route().current('posts.show', { post: 4 }); // true
   *
   * @param {String} [name] - Route name to check.
   * @param {(String|Number|Array|Object)} [params] - Route parameters.
   * @return {(Boolean|String|undefined)}
   */
  current(name, params) {
    const { name: current, params: currentParams, query, route: route2 } = this._unresolve();
    if (!name)
      return current;
    const match = new RegExp(`^${name.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(
      current
    );
    if ([null, void 0].includes(params) || !match)
      return match;
    const routeObject = new Route(current, route2, this._config);
    params = this._parse(params, routeObject);
    const routeParams2 = { ...currentParams, ...query };
    if (Object.values(params).every((p2) => !p2) && !Object.values(routeParams2).some((v2) => v2 !== void 0))
      return true;
    const isSubset = (subset, full) => {
      return Object.entries(subset).every(([key, value]) => {
        if (Array.isArray(value) && Array.isArray(full[key])) {
          return value.every((v2) => full[key].includes(v2));
        }
        if (typeof value === "object" && typeof full[key] === "object" && value !== null && full[key] !== null) {
          return isSubset(value, full[key]);
        }
        return full[key] == value;
      });
    };
    return isSubset(params, routeParams2);
  }
  /**
   * Get an object representing the current location (by default this will be
   * the JavaScript `window` global if it's available).
   *
   * @return {Object}
   */
  _location() {
    var _a, _b, _c;
    const {
      host = "",
      pathname = "",
      search = ""
    } = typeof window !== "undefined" ? window.location : {};
    return {
      host: ((_a = this._config.location) == null ? void 0 : _a.host) ?? host,
      pathname: ((_b = this._config.location) == null ? void 0 : _b.pathname) ?? pathname,
      search: ((_c = this._config.location) == null ? void 0 : _c.search) ?? search
    };
  }
  /**
   * Get all parameter values from the current window URL.
   *
   * @example
   * // at URL https://tighten.ziggy.dev/posts/4?lang=en with 'posts.show' route 'posts/{post}' and domain '{team}.ziggy.dev'
   * route().params; // { team: 'tighten', post: 4, lang: 'en' }
   *
   * @return {Object}
   */
  get params() {
    const { params, query } = this._unresolve();
    return { ...params, ...query };
  }
  /**
   * Check whether the given route exists.
   *
   * @param {String} name
   * @return {Boolean}
   */
  has(name) {
    return Object.keys(this._config.routes).includes(name);
  }
  /**
   * Parse Laravel-style route parameters of any type into a normalized object.
   *
   * @example
   * // with route parameter names 'event' and 'venue'
   * _parse(1); // { event: 1 }
   * _parse({ event: 2, venue: 3 }); // { event: 2, venue: 3 }
   * _parse(['Taylor', 'Matt']); // { event: 'Taylor', venue: 'Matt' }
   * _parse([4, { uuid: 56789, name: 'Grand Canyon' }]); // { event: 4, venue: 56789 }
   *
   * @param {(String|Number|Array|Object)} params - Route parameters.
   * @param {Route} route - Route instance.
   * @return {Object} Normalized complete route parameters.
   */
  _parse(params = {}, route2 = this._route) {
    params ?? (params = {});
    params = ["string", "number"].includes(typeof params) ? [params] : params;
    const segments = route2.parameterSegments.filter(({ name }) => !this._config.defaults[name]);
    if (Array.isArray(params)) {
      params = params.reduce(
        (result, current, i2) => segments[i2] ? { ...result, [segments[i2].name]: current } : typeof current === "object" ? { ...result, ...current } : { ...result, [current]: "" },
        {}
      );
    } else if (segments.length === 1 && !params[segments[0].name] && (params.hasOwnProperty(Object.values(route2.bindings)[0]) || params.hasOwnProperty("id"))) {
      params = { [segments[0].name]: params };
    }
    return {
      ...this._defaults(route2),
      ...this._substituteBindings(params, route2)
    };
  }
  /**
   * Populate default parameters for the given route.
   *
   * @example
   * // with default parameters { locale: 'en', country: 'US' } and 'posts.show' route '{locale}/posts/{post}'
   * defaults(...); // { locale: 'en' }
   *
   * @param {Route} route
   * @return {Object} Default route parameters.
   */
  _defaults(route2) {
    return route2.parameterSegments.filter(({ name }) => this._config.defaults[name]).reduce(
      (result, { name }, i2) => ({ ...result, [name]: this._config.defaults[name] }),
      {}
    );
  }
  /**
   * Substitute Laravel route model bindings in the given parameters.
   *
   * @example
   * _substituteBindings({ post: { id: 4, slug: 'hello-world', title: 'Hello, world!' } }, { bindings: { post: 'slug' } }); // { post: 'hello-world' }
   *
   * @param {Object} params - Route parameters.
   * @param {Object} route - Route definition.
   * @return {Object} Normalized route parameters.
   */
  _substituteBindings(params, { bindings, parameterSegments }) {
    return Object.entries(params).reduce((result, [key, value]) => {
      if (!value || typeof value !== "object" || Array.isArray(value) || !parameterSegments.some(({ name }) => name === key)) {
        return { ...result, [key]: value };
      }
      if (!value.hasOwnProperty(bindings[key])) {
        if (value.hasOwnProperty("id")) {
          bindings[key] = "id";
        } else {
          throw new Error(
            `Ziggy error: object passed as '${key}' parameter is missing route model binding key '${bindings[key]}'.`
          );
        }
      }
      return { ...result, [key]: value[bindings[key]] };
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function route(name, params, absolute, config) {
  const router = new Router(name, params, absolute, config);
  return name ? router.toString() : router;
}
const app = express();
const port = 13714;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const originalError = console.error;
console.error = (message, ...args) => {
  if (!message.includes("useLayoutEffect does nothing on the server")) {
    originalError(message, ...args);
  }
};
app.post("/render", async (req, res) => {
  var _a, _b, _c;
  try {
    if (process.env.NODE_ENV !== "production") {
      console.time("Render Time");
    }
    const { html } = req.body;
    const dom = new JSDOM(html, { runScripts: "dangerously" });
    global.navigator = dom.window.navigator;
    global.route = (name, params, absolute) => route(name, params, absolute, {
      ...dom.window.__laravext.page_data.shared_props.ziggy,
      url: dom.window.__laravext.page_data.shared_props.ziggy.url
    });
    global.Ziggy = dom.window.__laravext.page_data.shared_props.ziggy;
    let user = (_c = (_b = (_a = dom.window.__laravext.page_data) == null ? void 0 : _a.shared_props) == null ? void 0 : _b.auth) == null ? void 0 : _c.user;
    await createLaravextSsrApp({
      nexusResolver: (name) => resolveComponent(`./nexus/${name}`, /* @__PURE__ */ Object.assign({ "./nexus/(global)/(auth)/admin/companies/create/page.vue": () => import("./assets/page-BWsjPrzA.js"), "./nexus/(global)/(auth)/admin/companies/page.vue": () => import("./assets/page-CRaTPFWy.js"), "./nexus/(global)/(auth)/admin/companies/{company}/edit/page.vue": () => import("./assets/page-Msykcab0.js"), "./nexus/(global)/(auth)/admin/companies/{company}/page.vue": () => import("./assets/page-CwbpYFTw.js"), "./nexus/(global)/(auth)/admin/companies/{company}/projects/page.vue": () => import("./assets/page-ZSDFGcwA.js"), "./nexus/(global)/(auth)/admin/contact-requests/page.vue": () => import("./assets/page-C0ByIe3y.js"), "./nexus/(global)/(auth)/admin/dashboard/page.vue": () => import("./assets/page-l9CrYJt1.js"), "./nexus/(global)/(auth)/admin/developers/create/page.vue": () => import("./assets/page-beRHQ5Z7.js"), "./nexus/(global)/(auth)/admin/developers/page.vue": () => import("./assets/page-CUEVvjVd.js"), "./nexus/(global)/(auth)/admin/developers/{developer}/edit/page.vue": () => import("./assets/page-D-s-p67I.js"), "./nexus/(global)/(auth)/admin/projects/create/page.vue": () => import("./assets/page-ABPtEhxE.js"), "./nexus/(global)/(auth)/admin/projects/page.vue": () => import("./assets/page-CkkqEThk.js"), "./nexus/(global)/(auth)/admin/projects/{project}/edit/page.vue": () => import("./assets/page-DL1XOx5T.js"), "./nexus/(global)/(auth)/admin/projects/{project}/page.vue": () => import("./assets/page-BO1jqtnS.js"), "./nexus/(global)/(auth)/admin/teams/create/page.vue": () => import("./assets/page-tRNoFaWw.js"), "./nexus/(global)/(auth)/admin/teams/page.vue": () => import("./assets/page-Bq7_L37T.js"), "./nexus/(global)/(auth)/admin/teams/{team}/edit/page.vue": () => import("./assets/page-Dn5nXkhy.js"), "./nexus/(global)/(auth)/admin/teams/{team}/page.vue": () => import("./assets/page-BCTQnVWT.js"), "./nexus/(global)/(auth)/admin/teams/{team}/projects/page.vue": () => import("./assets/page-HS1_hVjP.js"), "./nexus/(global)/(auth)/error.vue": () => import("./assets/error-D3sK7S9p.js"), "./nexus/(global)/(auth)/layout.vue": () => import("./assets/layout-CFOzJ44m.js"), "./nexus/(global)/(auth)/middleware.vue": () => import("./assets/middleware-B4Am7Dt9.js"), "./nexus/(global)/(guest)/contact-us/page.vue": () => import("./assets/page-CYlGuJQR.js"), "./nexus/(global)/(guest)/loading.html": () => import("./assets/loading-DP2rzg_V.js"), "./nexus/(global)/(guest)/login/page.vue": () => import("./assets/page-Cc_jXvSn.js"), "./nexus/(global)/(guest)/our-projects/page.vue": () => import("./assets/page-Bi7KVGxq.js"), "./nexus/(global)/(guest)/our-teams/page.vue": () => import("./assets/page-DzYTfImx.js"), "./nexus/(global)/loading.html": () => import("./assets/loading-l0sNRNKZ.js") })),
      strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, /* @__PURE__ */ Object.assign({ "./strands/PrivacyToggle.vue": () => import("./assets/PrivacyToggle-Stc8CUqq.js") })),
      uses: () => {
        let locale = (user == null ? void 0 : user.locale) ?? Cookies.get("locale") ?? "en";
        const i18n = createI18n({
          legacy: false,
          locale,
          fallbackLocale: "en",
          messages: {
            pt
          }
        });
        return [
          { plugin: VueCookies, options: { expires: "7d" } },
          {
            plugin: k,
            options: {
              ...dom.window.__laravext.page_data.shared_props.ziggy,
              url: dom.window.__laravext.page_data.shared_props.ziggy.url
            }
          },
          /** @see https://vue-i18n.intlify.dev/guide/essentials/started.html for original example */
          { plugin: i18n },
          { plugin: VueSweetalert2 },
          { plugin, options: defaultConfig(fkConfig) }
        ];
      },
      laravext: dom.window.__laravext,
      document: dom.window.document
    });
    const updatedHtmlString = dom.serialize();
    res.send(updatedHtmlString);
    if (process.env.NODE_ENV !== "production") {
      console.timeEnd("Render Time");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error rendering page: " + error.message);
  }
});
app.listen(port, () => {
  console.log(`Node.js server is running on port ${port}`);
});
export {
  Head as H,
  nexusProps as n,
  routeParams as r,
  sharedProps as s
};
