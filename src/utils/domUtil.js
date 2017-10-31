export default {
	changeBodyBackground(color){
		var c = color || '#fff';
		document.body.style.backgroundColor = c;
	},
	resetBlur(){
		document.activeElement.blur();
	},
	toggleBodyScroll(isScroll){
		document.documentElement.classList.toggle('u-no-scroll', !isScroll);
		document.body.classList.toggle('u-no-scroll', !isScroll);
	}
}