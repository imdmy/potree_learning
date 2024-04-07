/**
 * @author Connor Manning
 */
/**
 * 根据你提供的代码片段来看，这似乎是一个用于加载点云数据的 JavaScript 。它使用了异步加载的方式，通过 fetch 方法获取文件，
 * 然后解析 JSON 数据，并最终创建了 Potree.PointCloudEptGeometry 或 Potree.PointCloudCopcGeometry 对象。
 * 在这个代码片段中，有一些关键的类和方法：
	1. **EptLoader 类：** 这个类包含一个静态方法 load，用于加载 EPT（Entwine Point Tile）格式的点云数据。它首先通过 fetch 方法获取文件，然后解析 JSON 数据并创建 Potree.PointCloudEptGeometry 对象。
	2. **CopcLoader 类：** 这个类也包含一个静态方法 load，用于加载 COPC（Cloud Optimized Point Cloud）格式的点云数据。它使用了 window.Copc 模块来创建 Copc 对象，并最终创建 Potree.PointCloudCopcGeometry 对象。
	从代码中可以看出，这些类和方法主要用于从文件或 URL 加载点云数据，并将其转换为 Potree 库中定义的特定类型的几何对象，以便在 Potree 点云渲染器中进行展示。
*/

export class EptLoader {  //用于加载 EPT（Entwine Point Tile）格式的点云数据
	static async load(file, callback) 
	{
		//使用了 await 关键字来等待 Promise 对象的解析，这意味着整个过程是异步的，直到获取到 JSON 数据后，才会继续执行后面的代码。需要注意的是，使用 await 关键字的代码必须包含在一个异步函数中。
		let response = await fetch(file);  //fetch() 是一个用于发起网络请求的现代 JavaScript API。它是浏览器提供的全局函数，在 Node.js 环境中不可用。fetch() 函数返回一个 Promise 对象，使得可以使用 then() 方法来处理请求的结果。
		let json = await response.json();

		let url = file.substr(0, file.lastIndexOf('/ept.json'));
		let geometry = new Potree.PointCloudEptGeometry(url, json);
		let root = new Potree.PointCloudCopcGeometryNode(geometry);

		geometry.root = root;
		geometry.root.load();

		callback(geometry);
	}
};

export class CopcLoader {  //用于加载COPC（Cloud Optimized Point Cloud）格式的点云数据
	static async load(file, callback) {
		const { Copc, Getter } = window.Copc

		const url = file;
		const getter = Getter.http(url);
		const copc = await Copc.create(getter);

		let geometry = new Potree.PointCloudCopcGeometry(getter, copc);
		let root = new Potree.PointCloudCopcGeometryNode(geometry);

		geometry.root = root;
		geometry.root.load();

		callback(geometry);
	}
}
