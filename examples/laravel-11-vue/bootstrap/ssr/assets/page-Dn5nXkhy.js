import { inject, reactive, onMounted, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./Fa-mqR-7ziz.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$2 } from "./Loading-B6yUkSxp.js";
import { _ as _sfc_main$5 } from "./Modal-BZp5eeYU.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$6 } from "./TextInput-C8eY-5uG.js";
import { p as privacy } from "./usePrivacy-tgfaLRgV.js";
import { debounce } from "lodash";
import { r as routeParams } from "../ssr.js";
import axios from "axios";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$4 } from "./Tooltip-DzeBfJzi.js";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-cookies";
import "@formkit/vue";
import "vue-sweetalert2";
import "@formkit/icons";
import "@formkit/i18n";
import "@formkit/pro";
/* empty css                            */
import "./vendor-others-CNLO9YKw.js";
import "@vue/server-renderer";
import "express";
import "jsdom";
import "qs";
import "js-cookie";
import "floating-vue";
/* empty css                             */
const _sfc_main = {
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const swal = inject("$swal");
    const form = reactive({
      data: {
        name: "",
        developers: []
      },
      errors: [],
      loading: true
    });
    onMounted(() => {
      form.loading = true;
      axios.get(`/api/teams/${routeParams().team}`).then((response) => {
        form.data = response.data;
        form.loading = false;
      }).catch(() => {
        swal(t("Error!"), "Failed to load team data.", "error");
        form.loading = false;
      });
    });
    const updateResource = () => {
      form.errors = {};
      const data = {
        name: form.data.name,
        developer_ids: form.data.developers.map((developer) => developer.id)
      };
      return axios.put(`/api/teams/${routeParams().team}`, data).then(() => {
        swal(t("Record updated!"), t("The team has been updated."), "success").then(() => {
          window.location.href = route("admin.teams.team", { team: routeParams().team });
        });
      }).catch(() => {
        swal(t("Error!"), "An error occurred while updating the team.", "error");
      });
    };
    const handleRemoveDeveloperFromTeam = (developer) => {
      form.data.developers = form.data.developers.filter((d) => d.id !== developer.id);
    };
    const addDeveloperToTeamModal = reactive({
      visible: false,
      loading: false,
      search: "",
      developers: []
    });
    const closeAddDeveloperToTeamModal = () => {
      addDeveloperToTeamModal.visible = false;
      addDeveloperToTeamModal.search = "";
      addDeveloperToTeamModal.developers = [];
    };
    const fetchDevelopers = () => {
      addDeveloperToTeamModal.loading = true;
      axios.get("/api/developers", {
        params: {
          per_page: 9,
          search: addDeveloperToTeamModal.search,
          filter: {
            not_team_ids: [routeParams().team].join(","),
            not_ids: form.data.developers.map((developer) => developer.id).join(",")
          }
        }
      }).then((response) => {
        addDeveloperToTeamModal.developers = response.data.data;
        addDeveloperToTeamModal.loading = false;
      }).catch((error) => {
        console.error(error);
        addDeveloperToTeamModal.loading = false;
      });
    };
    const destroyResource = (id) => {
      swal({
        title: t("Are you sure?"),
        icon: "warning",
        confirmButtonText: t("Yes, delete it!"),
        cancelButtonText: t("No, cancel!"),
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        showCancelButton: true,
        showCloseButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/teams/${id}`).then(() => {
            swal(t("Record deleted!"), t("The team has been deleted."), "success").then(() => {
              window.location.href = "/admin/teams";
            });
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the team."), "error");
          });
        }
      });
    };
    const debouncedSearchDevelopers = debounce(() => {
      if (addDeveloperToTeamModal.search.length == 0) {
        addDeveloperToTeamModal.developers = [];
        return;
      }
      fetchDevelopers();
    }, 1e3);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(form.loading ? _ctx.$t("Loading...") : `${_ctx.$t("Edit team")} #${unref(routeParams)().team} - ${form.data.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(form.loading ? _ctx.$t("Loading...") : `${_ctx.$t("Edit team")} #${unref(routeParams)().team} - ${form.data.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/teams/${unref(routeParams)().team}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PrimaryButton, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("Show"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(PrimaryButton, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DangerButton, {
        onClick: ($event) => destroyResource(unref(routeParams)().team),
        class: "hover:text-red-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Delete"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Delete")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (form.loading) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
        _push(ssrRenderComponent(PageContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_FormKit, {
                "submit-label": _ctx.$t("Save"),
                onSubmit: updateResource,
                type: "form"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "name",
                      validation: "length:2,200",
                      required: "",
                      id: "name",
                      label: _ctx.$t("Name"),
                      placeholder: `“${_ctx.$t("The Beatles")}”`,
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-lg font-bold"${_scopeId2}>${ssrInterpolate(_ctx.$t("Developers"))}: `);
                    _push3(ssrRenderComponent(PrimaryButton, {
                      onClick: ($event) => addDeveloperToTeamModal.visible = true,
                      class: "bg-green-600",
                      type: "button"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$3, { icon: "plus" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$3, { icon: "plus" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</span><div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(form.data.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                      _push3(`<div class="bg-white rounded-lg shadow p-4"${_scopeId2}><div class="font-bold flex justify-between"${_scopeId2}><span${_scopeId2}>@${ssrInterpolate(developer.username)}</span>`);
                      _push3(ssrRenderComponent(_sfc_main$4, {
                        text: _ctx.$t("Click to remove the developer from the team")
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_sfc_main$3, {
                              class: "cursor-pointer",
                              onClick: ($event) => handleRemoveDeveloperFromTeam(developer),
                              icon: "fa-trash",
                              color: "red"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_sfc_main$3, {
                                class: "cursor-pointer",
                                onClick: ($event) => handleRemoveDeveloperFromTeam(developer),
                                icon: "fa-trash",
                                color: "red"
                              }, null, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="border-b-2 border-gray-200 my-2"${_scopeId2}></div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Name"))}: ${ssrInterpolate(_ctx.$t(developer.name))}</div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Role"))}: ${ssrInterpolate(_ctx.$t(developer.role_label))}</div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Email: "))} ${ssrInterpolate(unref(privacy).active ? "***@***" : developer.email)}</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "text",
                        name: "name",
                        validation: "length:2,200",
                        required: "",
                        id: "name",
                        label: _ctx.$t("Name"),
                        placeholder: `“${_ctx.$t("The Beatles")}”`,
                        modelValue: form.data.name,
                        "onUpdate:modelValue": ($event) => form.data.name = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-lg font-bold" }, [
                        createTextVNode(toDisplayString(_ctx.$t("Developers")) + ": ", 1),
                        createVNode(PrimaryButton, {
                          onClick: ($event) => addDeveloperToTeamModal.visible = true,
                          class: "bg-green-600",
                          type: "button"
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3, { icon: "plus" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(form.data.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                          return openBlock(), createBlock("div", {
                            class: "bg-white rounded-lg shadow p-4",
                            key: developer.id
                          }, [
                            createVNode("div", { class: "font-bold flex justify-between" }, [
                              createVNode("span", null, "@" + toDisplayString(developer.username), 1),
                              createVNode(_sfc_main$4, {
                                text: _ctx.$t("Click to remove the developer from the team")
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$3, {
                                    class: "cursor-pointer",
                                    onClick: ($event) => handleRemoveDeveloperFromTeam(developer),
                                    icon: "fa-trash",
                                    color: "red"
                                  }, null, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1032, ["text"])
                            ]),
                            createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                            createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Name")) + ": " + toDisplayString(_ctx.$t(developer.name)), 1),
                            createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Role")) + ": " + toDisplayString(_ctx.$t(developer.role_label)), 1),
                            createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Email: ")) + " " + toDisplayString(unref(privacy).active ? "***@***" : developer.email), 1)
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                show: addDeveloperToTeamModal.visible,
                closeable: true,
                onClose: closeAddDeveloperToTeamModal,
                maxWidth: "w-[75vw]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="min-h-[50vh] p-6 shadow-none border-none"${_scopeId2}><h2 class="text-xl font-bold mb-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("Add developer to team"))}</h2>`);
                    _push3(ssrRenderComponent(_sfc_main$6, {
                      class: "w-full",
                      modelValue: addDeveloperToTeamModal.search,
                      "onUpdate:modelValue": ($event) => addDeveloperToTeamModal.search = $event,
                      onInput: unref(debouncedSearchDevelopers),
                      placeholder: _ctx.$t("Type to search for a developer by email or name")
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>`);
                    if (addDeveloperToTeamModal.loading) {
                      _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                      _push3(`<div class="bg-white shadow rounded-lg p-4"${_scopeId2}><div class="font-bold flex justify-between"${_scopeId2}>@${ssrInterpolate(developer.username)}`);
                      _push3(ssrRenderComponent(PrimaryButton, {
                        onClick: ($event) => {
                          form.data.developers.push(developer);
                          fetchDevelopers();
                        },
                        type: "button"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(_ctx.$t("Add"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(_ctx.$t("Add")), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="border-b-2 border-gray-200 my-2"${_scopeId2}></div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Name"))}: ${ssrInterpolate(_ctx.$t(developer.name))}</div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Role"))}: ${ssrInterpolate(_ctx.$t(developer.role_label))}</div><div class="text-sm"${_scopeId2}>${ssrInterpolate(_ctx.$t("Email: "))} ${ssrInterpolate(unref(privacy).active ? "***@***" : developer.email)}</div></div>`);
                    });
                    _push3(`<!--]--></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "min-h-[50vh] p-6 shadow-none border-none" }, [
                        createVNode("h2", { class: "text-xl font-bold mb-2" }, toDisplayString(_ctx.$t("Add developer to team")), 1),
                        createVNode(_sfc_main$6, {
                          class: "w-full",
                          modelValue: addDeveloperToTeamModal.search,
                          "onUpdate:modelValue": ($event) => addDeveloperToTeamModal.search = $event,
                          onInput: unref(debouncedSearchDevelopers),
                          placeholder: _ctx.$t("Type to search for a developer by email or name")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput", "placeholder"]),
                        createVNode("div", null, [
                          addDeveloperToTeamModal.loading ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : createCommentVNode("", true),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                              return openBlock(), createBlock("div", {
                                class: "bg-white shadow rounded-lg p-4",
                                key: developer.id
                              }, [
                                createVNode("div", { class: "font-bold flex justify-between" }, [
                                  createTextVNode("@" + toDisplayString(developer.username), 1),
                                  createVNode(PrimaryButton, {
                                    onClick: ($event) => {
                                      form.data.developers.push(developer);
                                      fetchDevelopers();
                                    },
                                    type: "button"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.$t("Add")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                                createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Name")) + ": " + toDisplayString(_ctx.$t(developer.name)), 1),
                                createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Role")) + ": " + toDisplayString(_ctx.$t(developer.role_label)), 1),
                                createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Email: ")) + " " + toDisplayString(unref(privacy).active ? "***@***" : developer.email), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_FormKit, {
                  "submit-label": _ctx.$t("Save"),
                  onSubmit: updateResource,
                  type: "form"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "name",
                      validation: "length:2,200",
                      required: "",
                      id: "name",
                      label: _ctx.$t("Name"),
                      placeholder: `“${_ctx.$t("The Beatles")}”`,
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                    createVNode("span", { class: "text-lg font-bold" }, [
                      createTextVNode(toDisplayString(_ctx.$t("Developers")) + ": ", 1),
                      createVNode(PrimaryButton, {
                        onClick: ($event) => addDeveloperToTeamModal.visible = true,
                        class: "bg-green-600",
                        type: "button"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, { icon: "plus" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(form.data.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                        return openBlock(), createBlock("div", {
                          class: "bg-white rounded-lg shadow p-4",
                          key: developer.id
                        }, [
                          createVNode("div", { class: "font-bold flex justify-between" }, [
                            createVNode("span", null, "@" + toDisplayString(developer.username), 1),
                            createVNode(_sfc_main$4, {
                              text: _ctx.$t("Click to remove the developer from the team")
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$3, {
                                  class: "cursor-pointer",
                                  onClick: ($event) => handleRemoveDeveloperFromTeam(developer),
                                  icon: "fa-trash",
                                  color: "red"
                                }, null, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1032, ["text"])
                          ]),
                          createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                          createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Name")) + ": " + toDisplayString(_ctx.$t(developer.name)), 1),
                          createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Role")) + ": " + toDisplayString(_ctx.$t(developer.role_label)), 1),
                          createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Email: ")) + " " + toDisplayString(unref(privacy).active ? "***@***" : developer.email), 1)
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["submit-label"]),
                createVNode(_sfc_main$5, {
                  show: addDeveloperToTeamModal.visible,
                  closeable: true,
                  onClose: closeAddDeveloperToTeamModal,
                  maxWidth: "w-[75vw]"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "min-h-[50vh] p-6 shadow-none border-none" }, [
                      createVNode("h2", { class: "text-xl font-bold mb-2" }, toDisplayString(_ctx.$t("Add developer to team")), 1),
                      createVNode(_sfc_main$6, {
                        class: "w-full",
                        modelValue: addDeveloperToTeamModal.search,
                        "onUpdate:modelValue": ($event) => addDeveloperToTeamModal.search = $event,
                        onInput: unref(debouncedSearchDevelopers),
                        placeholder: _ctx.$t("Type to search for a developer by email or name")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput", "placeholder"]),
                      createVNode("div", null, [
                        addDeveloperToTeamModal.loading ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : createCommentVNode("", true),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                            return openBlock(), createBlock("div", {
                              class: "bg-white shadow rounded-lg p-4",
                              key: developer.id
                            }, [
                              createVNode("div", { class: "font-bold flex justify-between" }, [
                                createTextVNode("@" + toDisplayString(developer.username), 1),
                                createVNode(PrimaryButton, {
                                  onClick: ($event) => {
                                    form.data.developers.push(developer);
                                    fetchDevelopers();
                                  },
                                  type: "button"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("Add")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                              createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Name")) + ": " + toDisplayString(_ctx.$t(developer.name)), 1),
                              createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Role")) + ": " + toDisplayString(_ctx.$t(developer.role_label)), 1),
                              createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Email: ")) + " " + toDisplayString(unref(privacy).active ? "***@***" : developer.email), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["show"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/teams/{team}/edit/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
