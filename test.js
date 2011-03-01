var component_hash = []

function keys(hash)
{
	var k = Array()

	for (var key in hash) {
		k.push(key)
	}

	return k.sort()
}

function addSubComponents(components)
{
	form = components.parentNode

	subcomponents = document.createElement("select")
	subcomponents.id = "subcomponent"

	form.insertBefore(subcomponents, components.nextSibling)
	updateSubComponents(components);
}

function updateSubComponents(components)
{
	subcomponents = document.getElementById("subcomponent");
	index = components.selectedIndex;
	name = components.options[index].text;

	subcomponents.options.length = 0;

	console.log(components)

	for each (var key in keys(component_hash[name])) {
		if (key != 'undefined') {
			opt = document.createElement("option");
			opt.value = component_hash[name][key].text;
			opt.appendChild(document.createTextNode(key));
			subcomponents.appendChild(opt);
		}
	}

	if (subcomponents.options.length == 0) {
		subcomponents.style.display = 'none';
	} else {
		subcomponents.style.display = '';
	}
}

function loadComponents()
{
	var j = 0
	components    = document.getElementById("component");
	subcomponents = document.getElementById("subcomponent");

	for (i = 0; i <= components.options.length - 1; i++) {
		opt = components.options[i];
		comp_split = opt.text.split(": ");

		console.log(comp_split)

		if (component_hash[comp_split[0]] == undefined) {
			component_hash[comp_split[0]] = [];
		}
		component_hash[comp_split[0]][comp_split[1]] = opt;
	}

	components.options.length = 0;

	for each (var key in keys(component_hash)) {
		opt = document.createElement("option");
		opt.value = key;
		opt.appendChild(document.createTextNode(key));
		components.appendChild(opt);
	}

	addSubComponents(components)
}
