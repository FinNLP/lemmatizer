import {prefixes} from "./prefixes";
import {lexicon} from "en-lexicon";
import {stemmer} from "en-stemmer";
import {Inflectors} from "en-inflectors";

// remove prefixes
// verbs and nouns
// safe stemmer

export function lemmatizer(string:string):string{
	return safeStemmer(verbsAndNouns(unprefixer(string)));
}

// removes prefixes
export function unprefixer(string:string):string{
	prefixes.forEach((prefix)=>{
		if(string.startsWith(prefix) && typeof lexicon[string.substr(prefix.length)] === "string") {
			string = string.substr(prefix.length);
		}
	});
	return string;
}

// remove inflections from verbs and nouns
function verbsAndNouns(token:string):string{
	if(isVerb(token)) return new Inflectors(token).toPresent();
	else if(isPluralNoun(token)) return new Inflectors(token).toSingular();
	return token;
}

// safe version of porter stemmer
function safeStemmer(string:string){
	const stem = stemmer(string);
	if(typeof lexicon[stem] === "string") return stem;
	else if(typeof lexicon[stem+"e"] === "string") return stem + "e";
	else if(typeof lexicon[stem+"y"] === "string") return stem + "y";
	else if(typeof lexicon[stem+"l"] === "string") return stem + "l";
	else return string;
}

function isVerb(string:string):boolean{
	if(typeof lexicon[string] === "string" && lexicon[string].split("|").find(x=>x.startsWith("V"))) return true;
	else return false;
}

function isPluralNoun(string:string):boolean{
	if(typeof lexicon[string] === "string" && lexicon[string].split("|").find(x=>x.startsWith("N") && x.endsWith("S"))) return true;
	else return false;
}

export default lemmatizer;
