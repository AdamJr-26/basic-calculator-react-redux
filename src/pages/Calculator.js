import React, { useState, useRef, useReducer, useEffect } from 'react'
import { selectColor } from '../features/color/calculatorSlice'
import {useSelector, useDispatch} from 'react-redux'

function Calculator({styles}) {
    const textValue = [7,8,9,'/',4,5,6,'*', 1,2,3,'-', 0, '.', '+', '=']
    var operators = []
    textValue.forEach(item=>{
        if(typeof item === "string"){
           operators.push(item)
        }
        
    })
    // ---------------
    const inputRef = useRef()
    const [inputs, setInputs] = useReducer((state, action)=>{
        switch(action.type){
            case "set":
                const isOperator = operators.includes(action.value)
                if(isOperator){
                    const prevOperator = state.slice(-1)
                    if(operators.includes(prevOperator)){
                        return state
                    }else{
                        return state + action.value
                    }
                }else{
                    return state + action.value
                }
                
            case "back":
                return state.slice(0, -1)
            case "clear":
                state = ""
                return state
            case "result":
                return action.value
            default:
                return state
                
        }
    }, "")
    // ---------------
    const numberHandler = (value)=>{
        if(value === "="){
            operationDiv.current.textContent = inputs
            setInputs({type: "result", value: "="+eval(inputs)})
        }else {
            setInputs({
                type: "set",
                value : value
            })
        }
        
    }
    // console.log('inputs', inputs)

    // onchange
    const handleOnChange = (e)=>{
        const newInput = e.target.value.slice(-1)
        if(newInput === "="){
            operationDiv.current.textContent = inputs
            setInputs({type: "result", value: "="+eval(inputs)})
        }else{
            const isValid = textValue.findIndex(value=> value == newInput)
            if(isValid > -1){
                setInputs({type: 'set', value:newInput})
            }
            else{
                // alert("invalid input, use Only 7,8,9,'/',4,5,6,'*', 1,2,3,'-', 0, '.', '+', '='")
            }
        }
        
    }
    // back space
    const back = useRef(null)
    const clear = useRef(null)
    useEffect(()=>{
        document.addEventListener("keydown", e =>{
            if(e.key === "Backspace"){
               back.current.focus()
               back.current.click()
               
            }
            if(e.key === "c"){
                clear.current.click();
            }
        })
        return ()=>{
        // ...
        }
    },[document.addEventListener("keydown", e=>{})])
    const operationDiv = useRef(null)

    // ----------- color state
    const color = useSelector(selectColor)
    console.log('colorrrrr', color)
    const [bodyColor, setColorBody] = useState()
    const [numberColor, setNumberColor] = useState()
    const [operatorColor, setOperatorColor] = useState()
    useEffect(()=>{
        if(color.part === "body"){
            setColorBody(color.color)
        }
        else if(color.part === "number"){
            setNumberColor(color.color)
        }
        else if(color.part === "operator"){
            setOperatorColor(color.color)
        }
    },[color])
  return (
    <div className='container' style={{backgroundColor : bodyColor}}>
        <div ref={operationDiv} className="operation"></div>

        <div className="input" style={styles.inputDiv}>
            <input className='operatorInput' ref={inputRef} type="text" style={styles.input} value={inputs} 
            onChange={(e)=> handleOnChange(e) } />
            <button className='clear' ref={clear} onClick={(e)=>setInputs({type : "clear"})}><i className='bx bx-trash'></i></button>
            <button className='back'ref={back} onClick={(e)=>setInputs({type : "back"})}><i className='bx bxs-chevrons-left' ></i></button>
        </div>
        <div className="buttons" >
            {
                textValue?.map((value, index)=>(
                    <button className={Number.isInteger(value) ? "number" : "operator"} key={index} 
                    style={ Number.isInteger(value) ? {backgroundColor :numberColor} :{backgroundColor : operatorColor}}
                    onClick={(e)=>{
                        numberHandler(e.target.textContent)
                    }}
                    >{value}</button>
                ))
            }
        </div>
    </div>
  )

}

export default Calculator