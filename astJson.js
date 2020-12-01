// 编写一个算法解析以下符号，转换为json树的结构
var str = "<xml><div><p><a/></p><p></p></div></xml>";
var startTagReg = /\<(\w+)\>/; // 匹配开始标签
var endTagReg = /\<\/(\w+)\>/; // 匹配结束标签
var closeSelfTagReg = /\<(\w+)\/\>/; // 匹配自闭合标签
var textNodeReg = /\>(.*?)\<\//; // 匹配文本内容
var tagReg = /\<\/?(\w+)\/?\>/g; // 全局匹配标签
var matchedTags = str.match(tagReg); // 在字符串中匹配到的标签数组
var htmlTree = null; // 保存生成的节点树
var nodeStacks = []; // 保存遍历过程中的节点栈
var currentNode = undefined;
// 根据标签创建新节点
function createNode(tag) {
    var tagName = tag.replace(tagReg, "$1");
    return {
        name: tagName,
        children: null
    };
}
// 将节点插入到当前操作栈的节点中
function insertNode(node) {
    if (htmlTree === null) {
        htmlTree = node;
    }
    else {
        if (currentNode.children === null) {
            currentNode.children = [node];
        }
        else {
            currentNode.children.push(node);
        }
    }
}
for (var _i = 0, matchedTags_1 = matchedTags; _i < matchedTags_1.length; _i++) {
    var tag = matchedTags_1[_i];
    if (startTagReg.test(tag)) {
        // 创建新节点
        var node = createNode(tag);
        // 向树插入新节点
        insertNode(node);
        // 压入栈，并进入该栈
        nodeStacks.push(node);
        currentNode = nodeStacks[nodeStacks.length - 1];
    }
    else if (endTagReg.test(tag)) {
        // 找栈中的相对应的节点索引
        var index = 0;
        nodeStacks.reverse();
        for (var i = 0; i < nodeStacks.length; i++) {
            if (nodeStacks[i].name === tag.replace(tagReg, "$1")) {
                index = i;
                break;
            }
        }
        index = nodeStacks.length - index;
        nodeStacks.reverse();
        // 删除索引外的栈
        nodeStacks.splice(index - 1);
        // 设置删除后的最后一项为当前节点
        currentNode = nodeStacks[nodeStacks.length - 1];
    }
    else if (closeSelfTagReg.test(tag)) {
        // 创建新节点
        var node = createNode(tag);
        // 插入新节点
        insertNode(node);
        // 自闭合不需要进栈出栈
    }
}
console.log(matchedTags);
console.log(htmlTree);
