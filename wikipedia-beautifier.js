/*
 * Copyright (C) 2011 Scott Wheeler <wheeler@kde.org>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function beautifier() {

	function insertCSS(url) {
		var head = document.getElementsByTagName("head")[0];
		var css = document.createElement("link");
		css.type = "text/css";
		css.rel = "stylesheet";
		css.href = url;
		head.appendChild(css);
	}

	insertCSS(chrome.extension.getURL("wikipedia-beautifier.css"));

	function parentDiv(element) {
		return (!element.parentNode || element.parentElement.tagName == "DIV") ? element.parentNode : parentDiv(element.parentNode);
	}

	function paragraphAdjuster(elements, margin) {
		for (var i = 0; i < elements.length; i++) {
			if (parentDiv(elements[i]) == bodyContent) {
				elements[i].className += (elements[i].className ? " " : "") + "hyphenate";
				elements[i].style.textAlign = "justify";
				elements[i].style.marginBottom = margin;
			}
		}
	}

	paragraphAdjuster(bodyContent.getElementsByTagName("p"), "1.0em");
	paragraphAdjuster(bodyContent.getElementsByTagName("li"), "0.5em");

	Hyphenator.run();

	var refs = document.getElementsByClassName("references-column-width");

	for (var i = 0; i < refs.length; i++) {
		refs[i].style["-webkit-column-width"] = "380px";
	}

}

beautifier();