import { useState, useEffect, useRef } from 'react'
import './App.css'
import { TextField, Text } from '@radix-ui/themes'

const width = 1290;
const height = 2796;

function App() {
  const [foodImage, setFoodImage] = useState<string | null>('')
  const [foodName, setFoodName] = useState('')
  const [cookingProcess, setCookingProcess] = useState('')
  const [impression, setImpression] = useState('')
  const foodImgRef = useRef<HTMLImageElement>(null);

  const [png, setPng] = useState<string | null>(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas');
    canvasElem.width = width;
    canvasElem.height = height;
    const ctx = canvasElem.getContext('2d');

    if(ctx) {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#A8C7C3'
      ctx.fillRect(0, 0, width, height)
      ctx.beginPath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(68, 132, 1155, 2533);

      ctx.font = "64px serif";
      ctx.fillStyle = '#4B4B4B';
      ctx.fillText("料理部活動報告", 423, 224);
    }

    setPng(canvasElem.toDataURL())
  }, [])

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setFoodImage(window.URL.createObjectURL(fileObject));
  };

  return (
    <>
      <div>
        <input type='file' accept='image/*' onChange={onFileInputChange} />
        {foodImage && <img ref={foodImgRef} src={foodImage} style={{ width: 300 }} />}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <Text size='2' color='gray'>料理名</Text>
          <TextField.Root placeholder='魔法の壺プリン' value={foodName} onChange={e => setFoodName(e.target.value)} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <Text size='2' color='gray'>実施内容</Text>
          <TextField.Root placeholder='蓋を開けた' value={cookingProcess} onChange={e => setCookingProcess(e.target.value)} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <Text size='2' color='gray'>所感</Text>
          <TextField.Root placeholder='また食べたい' value={impression} onChange={e => setImpression(e.target.value)} />
        </div>
      </div>
      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="icon" src={png} style={{ width: 255 }} />
        </div>
      )}
    </>
  )
}

export default App
