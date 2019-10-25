<script>
import Zoom from './components/zoom';
import AddNodeBtn from './components/addNodeBtn';
import Node from './components/node';
import NodeWrap from './components/nodeWrap';
import BranchWrap from './components/branchWrap';
import BranchBox from './components/branchBox';
import dataJson from './data.json';
export default {
  data() {
    return {
      workflowData: dataJson,
      renderList: []
    }
  },
  methods: {
    // 是节点 不是条件
    isNode(data) {
      return data.type !== 'route'
    },
    isRoute(data) {
      return data.type === 'route'
    },
  },
  render() {
    console.log(dataJson);
    function isNode(data) {
      return data.type !== 'route'
    }
    function isRoute(data) {
      return data.type === 'route'
    }
    var result = [];
    var flatArr = function (dataJson) {
      if (isNode(dataJson)) {
        result.push(dataJson);
        if (dataJson.childNode) {
          flatArr(dataJson.childNode)
        }
      }
      if (isRoute(dataJson)) {
        result.push(dataJson)
      }
    }
    flatArr(dataJson);
    console.log(result)
    return <div>
      {result.map(res => {
        if (isNode(res)) {
          return (
            <div class="node-wrap">
              <Node {...{ props: { nodeType: res.type } }} ></Node>
              <AddNodeBtn></AddNodeBtn>
            </div>
          )
        }
        if (isRoute(res)) {
          return (<BranchWrap {...{ props: { conditionNodes: res.conditionNodes } }} />)
        }
      })}
    </div>
  },
}
</script>