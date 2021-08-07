let values = [];
let w = 10;

let states = [];

function go(){
  // console.log(values);
 var technique = (document.getElementById("Technique").value);
 console.log(technique);
 if(technique == 1){
   console.log("Bubble Sort");
   BubbleSort(values, 0, values.length - 1);
 }
 else if(technique == 2){
  console.log("Quick Sort");
  quickSort(values, 0, values.length - 1);
 }
 else if(technique == 3){
  console.log("Merge Sort");
  // MergeSort(values, 0, values.length - 1);
 }
 else if(technique == 4){
  console.log("Selection Sort");
  SelectionSort(values, 0, values.length - 1);
 }
 else{
  console.log("Insertion Sort");
  InsertionSort(values, 0, values.length - 1);
 }
}
function setup() {
  createCanvas(windowWidth - 25, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  
}

//Bubble sort

async function BubbleSort(arr, start, end){
  for(i=start;i+1<end;i++){
    for(j=start;j < end-i-1;j++){
      if(arr[j]>arr[j+1]){
        await swap(arr, j, j+1);
      }
    }
  }
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

async function equal(arr, i,j){
  await sleep(10);
  arr[i] = arr[j];
}

async function InsertionSort(arr, start, end) {
  console.log("arr");
  for(i=start;i<end;i++){
    var cur = arr[i];
    j = i-1;
    while(j>=0 && arr[j] > cur){
      // arr[j+1]=arr[j];
      await equal(arr, j+1, j);
      j--;
    }
    arr[j+1] = cur;
  }
}

async function SelectionSort(arr, start, end){

  for(i=0;i+1<end;i++){
    var minidx = i;
    for(j=i+1;j<end;j++){
      if(arr[j]<arr[minidx]){
        minidx = j;
      }
    }
    await swap(arr, i, minidx);
  }
}
      

function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#E0777D');
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}



async function swap(arr, a, b) {
  await sleep(10);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}