import{_ as a}from"./Icon.vue_vue_type_script_setup_true_lang.DA1ejTYs.js";import{d as i,p as u,c as d,o as n,n as f,b as o,e as l,j as r,r as y}from"./framework.B41b4LrZ.js";const b=["disabled","autofocus","type"],m=i({name:"VKButton"}),v=i({...m,props:{type:null,size:null,plain:{type:Boolean},round:{type:Boolean},circle:{type:Boolean},disabled:{type:Boolean},nativeType:{default:"button"},autofocus:{type:Boolean},icon:null,loading:{type:Boolean}},setup(e,{expose:s}){const t=u();return s({ref:t}),(c,B)=>(n(),d("button",{ref_key:"_ref",ref:t,class:f(["vk-button",{[`vk-button--${e.type}`]:e.type,[`vk-button--${e.size}`]:e.size,"is-plain":e.plain,"is-round":e.round,"is-circle":e.circle,"is-disabled":e.disabled,"is-loading":e.loading}]),disabled:e.disabled||e.loading,autofocus:e.autofocus,type:e.nativeType},[e.loading?(n(),o(a,{key:0,icon:"spinner",spin:""})):l("",!0),e.icon?(n(),o(a,{key:1,icon:e.icon},null,8,["icon"])):l("",!0),r("span",null,[y(c.$slots,"default")])],10,b))}});export{v as _};
