String.prototype.capitalizeWords=function(){
    return this.replace(/\b[a-z]/g, match=>match.toUpperCase());
}

console.log("this words will be capitalized.".capitalizeWords());