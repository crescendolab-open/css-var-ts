import{j as g}from"./jsx-runtime-D_zvdyIk.js";import{c as d,s as y}from"./cssVarUtils-8w5pWjvj.js";import"./iframe-CAvveSke.js";import"./preload-helper-PPVm8Dsz.js";const l=d.create({recordKeyToCssVarKey:u=>`--static-${y(u)}`}),r=l.define({navy:"#001F3F",blue:"#0074D9",aqua:"#7FDBFF",teal:"#39CCCC",olive:"#3D9970",green:"#2ECC40",lime:"#01FF70",yellow:"#FFDC00",orange:"#FF851B",red:"#FF4136",fuchsia:"#F012BE",purple:"#B10DC9",maroon:"#85144B",white:"#FFFFFF",silver:"#DDDDDD",gray:"#AAAAAA",black:"#111111"}),a=l.define({primary:r.getValue("navy"),secondary:r.getValue("gray"),success:r.getValue("green"),warning:r.getValue("orange"),error:r.getValue("red"),background:r.getValue("white"),foreground:r.getValue("black")}),v=["blue","aqua","teal","olive","lime","orange","fuchsia","purple","maroon"],f=["foreground","primary","secondary","success","warning","error"],F=({text:u,color:p,variant:m})=>g.jsx("div",{style:{...r.cssProps,...a.cssProps,fontFamily:"system-ui, sans-serif",[a.getKey("primary")]:r.getValue(p),color:a.getValue(m),backgroundColor:a.getValue("background")},children:u}),h={component:F,args:{text:"Hello, CSS Variable!",color:"navy",variant:"foreground"},argTypes:{text:{control:"text",description:"Text to display"},color:{control:{type:"inline-radio"},options:v,description:"Color of the text"},variant:{control:{type:"inline-radio"},options:f,description:"Status of the text"}}},e={},s={args:{color:"fuchsia",variant:"primary"}},o={args:{color:"blue",variant:"primary"}},t={args:{variant:"secondary"}},n={args:{variant:"success"}},c={args:{variant:"warning"}},i={args:{variant:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    color: "fuchsia",
    variant: "primary"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    variant: "primary"
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "success"
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning"
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error"
  }
}`,...i.parameters?.docs?.source}}};const x=["playground","fuchsiaPrimary","bluePrimary","secondary","success","warning","error"];export{x as __namedExportsOrder,o as bluePrimary,h as default,i as error,s as fuchsiaPrimary,e as playground,t as secondary,n as success,c as warning};
