function handleMessage(e) {
	var tongwen = e.message;
	switch (e.name) {
		case "IconAction"   :
			switch (tongwen.iconAction) {
				case "trad": TongWen.trans2Trad(); break;
				case "simp": TongWen.trans2Simp(); break;
				default    : TongWen.transAuto();
			}
			break;
		case "WebPage2Trad"  : TongWen.trans2Trad(); break;
		case "WebPage2Simp"  : TongWen.trans2Simp(); break;
		case "CustomFontset" :
			TongWen.enableCustomFontset(tongwen.fontCustom.enable);
			if (tongwen.fontCustom.enable) {
				TongWen.setTradFontset(tongwen.fontCustom.trad);
				TongWen.setSimpFontset(tongwen.fontCustom.simp);
			}
			break;
		case "LoadUserPhrase":
			if (tongwen.userPhrase.enable) {
				TongWen.addS2TTable(tongwen.userPhrase.trad);
				TongWen.addT2STable(tongwen.userPhrase.simp);
			}
			break;
	}
}

safari.self.addEventListener("message", handleMessage, false);
safari.self.tab.dispatchMessage("PageLoaded", {
	"baseURI" : window.location.href
});