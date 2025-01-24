export function getConvertedUrlText(text: string) {
	let textArr = text.split("-");
	for (let i = 0; i < textArr.length; i++) {
		textArr[i] = `${textArr[i][0].toUpperCase()}${textArr[i].slice(1)}`;
	}
	return textArr.join(" ");
}

export function getCurrentPageUrlText( text : string ) { 
    let arr = text.split('/').filter(name => name !== '')
    return arr[arr.length - 1]
}
