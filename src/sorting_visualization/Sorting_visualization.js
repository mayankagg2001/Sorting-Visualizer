import React, { forwardRef, useState } from 'react';
import '../components/Buttons.css'
import './sorting_visualization.css';
import Label from '../components/Label'

const minspeed = 10;
const maxspeed = 100;
const max = 380;
const min = 10;
function Sorting_visualization() {

    //var size = 80;
    //function setsize(number){size = number;}
    const [size,setsize] = useState(80);
    const [array, setarray] = useState(randomarray(size));
    const [speed, setspeed] = useState(40);
    const [running,changestate] = useState(false);
    
    
    //var delay = (maxspeed - speed + minspeed);
    var delay = (40000/(size*speed));
    var c_delay = 0;


    function randomint(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomarray(number) {
        const arr = [];
        for (let i = 0; i < number; i++) arr.push(randomint(min, max));
        return arr;
    }

    function display(number) {
        return (<div className="arrays" style={{ height: `${number}px` }} ></div>);
    }


    function changearray(event) {
        const number = event.target.value;
        setsize(number);
        generatearray(number);
    }

    function changespeed(event){
        setspeed(event.target.value);
    }

    function generatearray() {
        if(running) return; 
        {const number = document.querySelector('#input__slider').value;
        const a = randomarray(number);
        let x = document.querySelectorAll('.arrays');
        for(let i=0;i<x.length;i++)
        {x[i].style.backgroundColor = "greenyellow";}
        setarray(a);
    }
}

    function update_height(a, i, color,d) {
        const a1 = a.slice();
        var x = document.querySelectorAll('.arrays');
        setTimeout(() => {


            setarray(a1);
            x[i].style.backgroundColor = color;

        }, c_delay);
        c_delay += delay/d;
    }

    function update(a, i, color,d) {
        var x = document.querySelectorAll('.arrays');
        setTimeout(() => {
            x[i].style.backgroundColor = color;
        }, c_delay);
        c_delay += delay/d;
    }

    function selectionsort() {
        if(running) return;
        changestate(true);
        const a = array.slice();
        for (let i = 0; i < a.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < a.length; j++) {
                if (a[min] > a[j]) {
                    min = j;
                    update(a, j, "red",2);
                    update(a, j, "greenyellow",2);
                }
                else {
                    update(a, j, "blue",2);
                    update(a, j, "greenyellow",2);
                }
            }


            [a[i], a[min]] = [a[min], a[i]];
            update_height(a, i, "orange",2);
        }
        update(a, a.length - 1, "orange",2);
        setTimeout(()=>{changestate(false)},c_delay);
        c_delay = delay;
    }

    function insertionsort() {
        if(running) return;
        changestate(true);
        const a = array.slice();
        for (let i = 0; i < a.length; i++) {
            let key = a[i];
            let j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                update_height(a, j + 1, "blue",2);
                update_height(a, j + 1, "orange",2);
                j--;
            }
            a[j + 1] = key;
            update_height(a, j + 1, "orange",2);
        }
        setTimeout(()=>{changestate(false)},c_delay);
        c_delay = delay;
    }

    function bubblesort() {
        if(running) return;
        changestate(true);
        const a = array.slice();
        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - 1 - i; j++) {
                if (a[j] > a[j + 1]) {
                    update(a, j, "blue",4);
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                }
                else {
                    update(a, j, "red",4);
                    update(a, j + 1, "red",4);
                }
                update_height(a, j, "greenyellow",4);
                update(a, j + 1, "greenyellow",4);
            }
            update(a, a.length - 1 - i, "orange",4);
        }
        update(a,0,"orange",3)
        setTimeout(()=>{changestate(false)},c_delay);
        c_delay = delay;

    }

    function merge(arr, start, middle, end) {
        let color = "blue";
        if(start===0 && end === arr.length-1) color="orange";
        let a = [];
        let i = start;
        let j = middle+1;
        while(i<=middle&&j<=end){
            if(arr[i]>arr[j]){
                update(arr,j,"red",1);
                a.push(arr[j++]);
            }
            else{
                update(arr,i,"red",1);
                a.push(arr[i++]);
            }
        }
        while(i<=middle){
            update(arr,i,"red",1);
            a.push(arr[i++]);
        } 
        while(j<=end){
            update(arr,j,"red",1);
            a.push(arr[j++]);
        }
        for(let i=0;i<a.length;i++){
            arr[start+i] = a[i];
            update_height(arr,start+i,color,1); 
        }
    }

    function mergesortutil(arr, start, end) {
        if (start < end) {
            const middle = Math.floor((start + end - 1) / 2);
            mergesortutil(arr, start, middle);
            mergesortutil(arr, middle + 1, end);
            merge(arr, start, middle, end);
            // update_height(arr);
        }
    }

    function mergesort() {
        if(running) return;
        changestate(true);
        const a = array.slice();
        const middle = Math.floor((a.length - 1) / 2);
        mergesortutil(a, 0, middle);
        mergesortutil(a, middle + 1, a.length - 1);
        merge(a, 0, middle, a.length - 1);
        // update_height(a);
        setTimeout(()=>{changestate(false)},c_delay);
        c_delay = delay;
    }

    function partition(a, start, end) {
        let index = start - 1;
        const pivot = a[end];
        update(a,end,"red",1);
        for (let i = start; i < end; i++) {
            if (a[i] < pivot) {
                index++;
                update(a,index,"red",1);
                update(a,i,"red",1);
                [a[index], a[i]] = [a[i], a[index]];
                update_height(a,i,"greenyellow",1);
                update(a,index,"greenyellow",1);
            }
            else
            {
                update(a,i,"red",1);
                update(a,i,"greenyellow",1);
            }
        }
        update(a,index+1,"red",1);
        [a[index + 1], a[end]] = [a[end], a[index + 1]];
        update_height(a,end,"greenyellow",1);
        update(a,index+1,"blue",1);
        return index + 1;
    }

    function quicksortutil(a, start, end) {
        if (start < end) {
            const index = partition(a, start, end);
            // update_height(a);
            quicksortutil(a, start, index - 1);
            quicksortutil(a, index + 1, end);
        }
    }
    function quicksort() {
        if(running) return;
        changestate(true);
        const a = array.slice();
        //console.log(a);
        quicksortutil(a, 0, a.length - 1);
        let x = document.querySelectorAll('.arrays');
        setTimeout(()=>{for(let i=0;i<x.length;i++)
            {x[i].style.backgroundColor = "orange";}},c_delay)
        

        // update_height(a);
        // console.log(a);
        setTimeout(()=>{changestate(false)},c_delay);
        c_delay = delay;
    }

    function heapify(a,n,i){
        let arr = a.slice();
        let largest = i;
        const index = i;
        let l = 2*i+1;
        let r = 2*i+2;
        if(l<n && arr[l]>arr[largest])
        largest = l;
        if(r<n && arr[r]>arr[largest])
        largest = r;
        if(largest!=i)
        {   
            update(arr,index,"blue",2);
            update(arr,largest,"blue",2);
            
            [arr[i],arr[largest]] = [arr[largest],arr[i]];
            update_height(arr,largest,"greenyellow",2);
            update(arr,index,"greenyellow",2);
            arr = heapify(arr,n,largest)
        }
        return arr;
    }

    function heapsort(){
        if(running) return;
        let a = array.slice();
        const n = a.length;
        changestate(true);
        for(let i=n/2;i>=0;i--) a = heapify(a,n,i);
        for(let i=n-1;i>0;i--) {
            [a[0],a[i]] = [a[i],a[0]];
            update(a,i,"orange",2);
            a =  heapify(a,i,0);
           
        }
        update_height(a,0,"orange",2);
        setTimeout(()=>{changestate(false);},c_delay);
        c_delay = delay;   

    }

    return (

        <div>
            <div className="input__style">
                <label for="input__slider" >Size of Array</label>
                <input type="range" id="input__slider" className="input__slider" min="20" max="200" onChange={changearray} value={size} step="1" />
            </div>
            <div className="input__style">
                <label for="input__slider">Speed of Sorting</label>
                <input type="range" id="input__slider2" className="input__slider" min={minspeed} max={maxspeed} onChange={changespeed} value={speed} step="1" />
            </div>
            <div className="Buttons" >
                <button className="button" onClick={generatearray} >Generate New Array</button>
                <button className="button" onClick={quicksort} >Quick Sort</button>
                <button className="button" onClick={mergesort} >Merge Sort</button>
                <button className="button" onClick={insertionsort} >Insertion Sort</button>
                <button className="button" onClick={heapsort}>Heap Sort</button>
                <button className="button" onClick={selectionsort} >Selection Sort</button>
                <button className="button" onClick={bubblesort}>Bubble Sort</button>
            </div>
            <div className="bar__arrays">
                {array.map(display)}
            </div>
            <div className="footer">
                <Label/>
            </div>
        </div>
    );
}

export default Sorting_visualization;
