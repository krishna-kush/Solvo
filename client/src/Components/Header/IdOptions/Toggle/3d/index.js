import './index.scss'

const index = () => {
  return (<>
    {/* <input type="checkbox" id="toggle" name="toggle" value="is_on" /> */}
    <label for="toggle" className="toy-toggle">
        <span className="border1"></span>
        <span className="border2"></span>
        <span className="border3"></span>
        <span className="handle">
            <span className="handle-off"></span>
            <span className="handle-on"></span>
        </span>
    </label>
  </>)
}

export default index