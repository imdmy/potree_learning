
export * from "./Actions.js";
export * from "./AnimationPath.js";
export * from "./Annotation.js";
export * from "./defines.js";
export * from "./Enum.js";
export * from "./EventDispatcher.js";
export * from "./Features.js";
export * from "./KeyCodes.js";
export * from "./LRU.js";
export * from "./PointCloudEptGeometry.js";
export * from "./PointCloudOctree.js";
export * from "./PointCloudOctreeGeometry.js";
export * from "./PointCloudTree.js";
export * from "./Points.js";
export * from "./Potree_update_visibility.js";
export * from "./PotreeRenderer.js";
export * from "./ProfileRequest.js";
export * from "./TextSprite.js";
export * from "./utils.js";
export * from "./Version.js";
export * from "./WorkerPool.js";
export * from "./XHRFactory.js";
export * from "./viewer/SaveProject.js";
export * from "./viewer/LoadProject.js";

export * from "./materials/ClassificationScheme.js";
export * from "./materials/EyeDomeLightingMaterial.js";
export * from "./materials/Gradients.js";
export * from "./materials/NormalizationEDLMaterial.js";
export * from "./materials/NormalizationMaterial.js";
export * from "./materials/PointCloudMaterial.js";

export * from "./loader/POCLoader.js";
export * from "./modules/loader/2.0/OctreeLoader.js";
export * from "./loader/EptLoader.js";
export * from "./loader/ept/BinaryLoader.js";
export * from "./loader/ept/LaszipLoader.js";
export * from "./loader/ept/ZstandardLoader.js";
export * from "./loader/PointAttributes.js";
export * from "./loader/ShapefileLoader.js";
export * from "./loader/GeoPackageLoader.js";

export * from "./utils/Box3Helper.js";
export * from "./utils/ClippingTool.js";
export * from "./utils/ClipVolume.js";
export * from "./utils/GeoTIFF.js";
export * from "./utils/Measure.js";
export * from "./utils/MeasuringTool.js";
export * from "./utils/Message.js";
export * from "./utils/PointCloudSM.js";
export * from "./utils/PolygonClipVolume.js";
export * from "./utils/Profile.js";
export * from "./utils/ProfileTool.js";
export * from "./utils/ScreenBoxSelectTool.js";
export * from "./utils/SpotLightHelper.js";
export * from "./utils/TransformationTool.js";
export * from "./utils/Volume.js";
export * from "./utils/VolumeTool.js";
export * from "./utils/Compass.js";

export * from "./viewer/viewer.js";
export * from "./viewer/Scene.js";
export * from "./viewer/HierarchicalSlider.js";

export * from "./modules/OrientedImages/OrientedImages.js";
export * from "./modules/Images360/Images360.js";
export * from "./modules/CameraAnimation/CameraAnimation.js";

export * from "./modules/loader/2.0/OctreeLoader.js";

export {OrbitControls} from "./navigation/OrbitControls.js";
export {FirstPersonControls} from "./navigation/FirstPersonControls.js";
export {EarthControls} from "./navigation/EarthControls.js";
export {DeviceOrientationControls} from "./navigation/DeviceOrientationControls.js";
export {VRControls} from "./navigation/VRControls.js";

import "./extensions/OrthographicCamera.js";
import "./extensions/PerspectiveCamera.js";
import "./extensions/Ray.js";

import {LRU} from "./LRU.js";
import {OctreeLoader} from "./modules/loader/2.0/OctreeLoader.js";
import {POCLoader} from "./loader/POCLoader.js";
import {CopcLoader, EptLoader} from "./loader/EptLoader.js";
import {PointCloudOctree} from "./PointCloudOctree.js";
import {WorkerPool} from "./WorkerPool.js";

export const workerPool = new WorkerPool();

export const version = {
	major: 1,
	minor: 8,
	suffix: '.0'
};

export let lru = new LRU();

console.log('Potree ' + version.major + '.' + version.minor + version.suffix);

export let pointBudget = 1 * 1000 * 1000;
export let framenumber = 0;
export let numNodesLoading = 0;
export let maxNodesLoading = 4;

export const debug = {};

let scriptPath = "";

if (document.currentScript && document.currentScript.src) {
	scriptPath = new URL(document.currentScript.src + '/..').href;
	if (scriptPath.slice(-1) === '/') {
		scriptPath = scriptPath.slice(0, -1);
	}
} else if(import.meta){
	scriptPath = new URL(import.meta.url + "/..").href;
	if (scriptPath.slice(-1) === '/') {
		scriptPath = scriptPath.slice(0, -1);
	}
}else {
	console.error('Potree was unable to find its script path using document.currentScript. Is Potree included with a script tag? Does your browser support this function?');
}

let resourcePath = scriptPath + '/resources';

// scriptPath: build/potree
// resourcePath:build/potree/resources
export {scriptPath, resourcePath};

//匿名函数和箭头函数通常用于函数式编程、回调函数、高阶函数等场景，例如在 map()、filter()、reduce() 等函数中作为参数传递，或者在需要一个简单的函数时使用。箭头函数特别常用于 JavaScript 中的函数式编程和异步编程。
export function loadPointCloud(path, name, callback){  
//定义loadPointCloud函数，export导出，callback 是一个回调函数，在点云加载完成后会被调用。
	let loaded = function(e){     //load定义为一个回调函数，是在loadPointCloud函数内部的另一个回调函数，回调函数是一种常见的 JavaScript 编程模式，它允许你在异步操作完成后执行特定的代码。在这个例子中，loadPointCloud 函数是用来加载点云数据的，通常这种操作是异步的，因为加载数据可能需要一些时间，不能立即得到结果。在点云加载完成后，loaded 回调函数会被调用，它将加载完成的点云对象作为参数传递给 callback 函数，这样调用者就可以在加载完成后执行自己的逻辑。
		e.pointcloud.name = name;  //function(e) 中的 e 是一个变量名，代表了回调函数接收到的参数。
		callback(e);  //“当函数执行完后，将处理后的数据给到回调函数”
	};
	/* 使用 var 声明匿名函数,无论在何处声明匿名函数，它都会被视为在作用域顶部声明的函数。
	 * 如果使用 let 声明匿名函数，它将不会被提升到作用域顶部，而是留在声明的位置。
	 * 这意味着，在 let 声明之前引用匿名函数会导致 ReferenceError。*/
	let promise = new Promise( resolve => {  //Promise 构造函数是 JavaScript 中用于创建 Promise 对象的内置构造函数。
		// 执行异步操作，最终通过 resolve 函数将 Promise 对象解决
  		// resolve 函数接受一个参数，表示 Promise 的解决值
		// load pointcloud
		if (!path){
			// TODO: callback? comment? Hello? Bueller? Anyone?
			alert(`hello? you set path to false! and ${path}`)
		} 
		
		else if (path.includes('123.txt')) {
			EptLoader.load(path, function(geometry) {  //使用匿名函数作为回调函数
				if (!geometry) {
					console.error(new Error(`failed to load point cloud from URL: ${path}`));  //在模板字符串中，${} 内部的内容会被求值，并将结果插入到字符串中。这使得模板字符串在动态生成字符串时更加灵活方便。
				} 
				else {
					let pointcloud = new PointCloudOctree(geometry);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});
		} 
		
		else if (path.includes('.copc.laz')) {
			CopcLoader.load(path, function(geometry) {
				if (!geometry) {
					console.error(new Error(`failed to load point cloud from URL: ${path}`));
				}
				else {
					let pointcloud = new PointCloudOctree(geometry);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});
		} 
		
		else if (path.indexOf('cloud.js') > 0) {
			POCLoader.load(path, function (geometry) {
				if (!geometry) {
					//callback({type: 'loading_failed'});
					console.error(new Error(`failed to load point cloud from URL: ${path}`));
				} else {
					let pointcloud = new PointCloudOctree(geometry);
					// loaded(pointcloud);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});
		} 
		
		else if (path.indexOf('metadata.json') > 0) {
			Potree.OctreeLoader.load(path).then(e => {
				let geometry = e.geometry;

				if(!geometry){
					console.error(new Error(`failed to load point cloud from URL: ${path}`));
				}else{
					let pointcloud = new PointCloudOctree(geometry);

					let aPosition = pointcloud.getAttribute("position");

					let material = pointcloud.material;
					material.elevationRange = [
						aPosition.range[0][2],
						aPosition.range[1][2],
					];

					// loaded(pointcloud);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});

			OctreeLoader.load(path, function (geometry) {
				if (!geometry) {
					//callback({type: 'loading_failed'});
					console.error(new Error(`failed to load point cloud from URL: ${path}`));
				} else {
					let pointcloud = new PointCloudOctree(geometry);
					// loaded(pointcloud);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});
		} 
		
		else if (path.indexOf('.vpc') > 0) {
			PointCloudArena4DGeometry.load(path, function (geometry) {
				if (!geometry) {
					//callback({type: 'loading_failed'});
					console.error(new Error(`failed to load point cloud from URL: ${path}`));
				} else {
					let pointcloud = new PointCloudArena4D(geometry);
					// loaded(pointcloud);
					resolve({type: 'pointcloud_loaded', pointcloud: pointcloud});
				}
			});
		} 
		
		else {
			//callback({'type': 'loading_failed'});
			console.error(new Error(`failed to load point cloud from URL: ${path}`));
		}
	});

	if(callback){
		promise.then(pointcloud => {
			loaded(pointcloud);
		});
	}else{
		return promise;
	}
};


// add selectgroup
(function($){
	$.fn.extend({
		selectgroup: function(args = {}){

			let elGroup = $(this);
			let rootID = elGroup.prop("id");
			let groupID = `${rootID}`;
			let groupTitle = (args.title !== undefined) ? args.title : "";

			let elButtons = [];
			elGroup.find("option").each((index, value) => {
				let buttonID = $(value).prop("id");
				let label = $(value).html();
				let optionValue = $(value).prop("value");

				let elButton = $(`
					<span style="flex-grow: 1; display: inherit">
					<label for="${buttonID}" class="ui-button" style="width: 100%; padding: .4em .1em">${label}</label>
					<input type="radio" name="${groupID}" id="${buttonID}" value="${optionValue}" style="display: none"/>
					</span>
				`);
				let elLabel = elButton.find("label");
				let elInput = elButton.find("input");

				elInput.change( () => {
					elGroup.find("label").removeClass("ui-state-active");
					elGroup.find("label").addClass("ui-state-default");
					if(elInput.is(":checked")){
						elLabel.addClass("ui-state-active");
					}else{
						//elLabel.addClass("ui-state-default");
					}
				});

				elButtons.push(elButton);
			});

			let elFieldset = $(`
				<fieldset style="border: none; margin: 0px; padding: 0px">
					<legend>${groupTitle}</legend>
					<span style="display: flex">

					</span>
				</fieldset>
			`);

			let elButtonContainer = elFieldset.find("span");
			for(let elButton of elButtons){
				elButtonContainer.append(elButton);
			}

			elButtonContainer.find("label").each( (index, value) => {
				$(value).css("margin", "0px");
				$(value).css("border-radius", "0px");
				$(value).css("border", "1px solid black");
				$(value).css("border-left", "none");
			});
			elButtonContainer.find("label:first").each( (index, value) => {
				$(value).css("border-radius", "4px 0px 0px 4px");

			});
			elButtonContainer.find("label:last").each( (index, value) => {
				$(value).css("border-radius", "0px 4px 4px 0px");
				$(value).css("border-left", "none");
			});

			elGroup.empty();
			elGroup.append(elFieldset);



		}
	});
})(jQuery);
