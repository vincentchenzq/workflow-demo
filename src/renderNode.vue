<script>
import Zoom from './components/zoom';
import AddNodeBtn from './components/addNodeBtn';
import Node from './components/node';
import NodeWrap from './components/nodeWrap';
import BranchWrap from './components/branchWrap';
import BranchBox from './components/branchBox'
import dataJson from './data.json';
export default {
  render: function (h, context) {
    function renderNode(data) {
      return (
        <div class="node-wrap">
          <Node {...{ props: { nodeType: data.type } }} ></Node>
          <AddNodeBtn></AddNodeBtn>
        </div>
      )
    }
    function renderCondition(data) {
      return (
        <div class="branch-wrap">
          <div class="branch-box-wrap">

          </div>
        </div>
      )
    }
    function getNode(data) {
      // 表示是节点
      if (data.childNode) {
        return (
          <div>
            {renderNode(data)}
          </div>
        )
      } else if (data.conditionNodes && data.conditionNodes.length) {
        return <div> {renderCondition(data.conditionNodes)}</div>
      }
    }
    let result = [];
    function flatArr(data) {

    }

    flatArr(dataJson)
    console.log(dataJson)
    return getNode(dataJson)
  }
}
</script>