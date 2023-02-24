function calcWordFrequencies() {
var txt = prompt("");
var arrayOfWords = txt.split(' ');
var wordCounts = {};

for (i = 0; i < arrayOfWords.length; i++) {
    var word = arrayOfWords[i];

    if (!wordCounts[word]) {
        wordCounts[word] = 1;
    } else {

        wordCounts[word]++;
    }
}
for (i in wordCounts) {
	console.log(i +" "+wordCounts[i]);
}

}
