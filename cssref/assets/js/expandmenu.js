/*
	Copyright (c) Alexander Shpack, 2005
	All rights reserved.
*/

DOM = (document.getElementById);
IE = (navigator.userAgent.indexOf("MSIE") != -1);

createTreeMenu = function(options, id){
	if(DOM){
		container = document.getElementById(id);
		if(container){
			treeWalk(container, options);
		}
	}
}

treeWalk = function(container, options){

	isCollapsed = !getStateFromClass(options.expanded, container.className);

	treeItems = document.getElementsByTagName(options.itemElement);

	for(var i=0; i<treeItems.length; i++){
		if(getStateFromClass(options.containerFlag, treeItems.item(i).className)){

			mayHaveContainer = getStateFromClass(options.containerFlag, treeItems.item(i).className);

			if(mayHaveContainer){

				container = getNearestContainer(treeItems.item(i), options.container);

				if(container){

					isItemExpanded = getStateFromClass(options.expanded, treeItems.item(i).className);

					if((isCollapsed && !isItemExpanded) || (!isCollapsed && !isItemExpanded)){
						container.style.display = "none";
					}
						
					treeItems.item(i).container = container;
					treeItems.item(i).expanded = options.expanded;
					treeItems.item(i).collapsed = options.collapsed;

					treeItems.item(i).onclick = function(e){
						this.container.style.display = (this.container.style.display == "none")? "block" : "none";
						setItemClass(this);
					}

					enableLinkClick(treeItems.item(i), options.itemLink);
				}
			}
		}
	}
}

getStateFromClass = function (str, className){
	return (className.indexOf(str) != -1)? true : false;
}

getNearestContainer = function (elem, className){
	if(elem.nextSibling.className){
		if(getStateFromClass(className, elem.nextSibling.className)){
			return elem.nextSibling;
		}else{
			return getNearestContainer(elem.nextSibling, className);
		}
	}else{
		return getNearestContainer(elem.nextSibling, className);
	}
}
enableLinkClick = function(elem, nodeName){
	links = elem.getElementsByTagName(nodeName);
	for(var i=0; i<links.length; i++){
		links.item(i).onclick = function(e){
			if(e){
				e.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		}
	}
}

setItemClass = function(node){
	if(node.container.style.display == "block"){
		removeClassName(node, node.collapsed)
		node.className += (" " + node.expanded);
	}else{
		removeClassName(node, node.expanded)
		node.className += (" " + node.collapsed);
	}
}
removeClassName = function(node, str){
	cName = node.className;
	re = new RegExp(str,"gi");
	node.className = cName.replace(re,"");
}
