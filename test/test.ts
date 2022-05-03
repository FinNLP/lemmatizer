/// <reference path="../node_modules/@types/node/index.d.ts" />

import lemmatizer from "../src/index";
import {readFileSync} from "fs";

let correct = 0;
let total = 0;

console.log(lemmatizer("unconditionally"));
console.log(lemmatizer("constructor")); // special check for a name that is in the prototype

readFileSync(__dirname+"/cases.txt","utf8").split("\n").forEach((testCase)=>{
    const lemma = testCase.split(" ")[0];
    const test = testCase.split(" ")[1];
    if(lemmatizer(test) === lemma) correct++;
    total++;
});

console.log(correct/total,correct,total);
