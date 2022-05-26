import React , { useState }from 'react'
import {TwitterPicker} from 'react-color';
import { changeColor, selectColor } from './features/color/calculatorSlice'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
function ColorPicker() {
    const [activeRadio, setActiveRadio] = useState();
    
    const dispatch = useDispatch();
    const radioHandler = (e)=>{
      setActiveRadio(e.target.value)
     
    }
    const handleChangeColor = (color)=>{
        dispatch(changeColor({part: activeRadio, color: color.hex}))
    }
    // handle change color parts
  return (
    <div className="colorpicker">
        <div className="component"  onChange={(e)=>radioHandler(e)} >
        <h3>Pick Color For: </h3>
        <div>
            <input type="radio" name="change_color" id="body" value='body' />
            <label htmlFor="body">Body</label>
        </div>
        <div>
            <input type="radio" name="change_color" id="number" value='number' />
            <label htmlFor="number">Numbers</label>
        </div>
        <div>
            <input type="radio" name="change_color" id="operator" value='operator' />
            <label htmlFor="operator">Operators</label>
        </div>
        </div>
        < TwitterPicker onChangeComplete={color=>handleChangeColor(color)} />
  </div>
  )
}

export default ColorPicker