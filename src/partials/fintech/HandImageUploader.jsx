import React, { useState, useEffect } from 'react'
import axios from 'axios' // 确保已经导入axios

function FintechCard01({ onImageSelected, updateAnalysisResult }) {
  const [image, setImage] = useState(null) // 用于存储File对象
  const [imageUrl, setImageUrl] = useState('') // 用于显示图片预览
  const [base64Image, setBase64Image] = useState('') // 新增状态，用于保存Base64编码的图片字符串

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        setBase64Image(base64) // 保存Base64编码的图片字符串
        onImageSelected(base64) // 传递Base64编码的图片给父组件
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!base64Image) {
      alert('请先上传一张图片！')
      return
    }

    const accessToken =
      '24.85617e47f6b11e98238f74c0059d58d6.2592000.1713550006.282335-57433128' // 替换为你的access_token
    const apiUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v1/gesture?access_token=${accessToken}`
    // 直接使用base64Image，它已经是Base64编码的字符串
    const imageEncoded = encodeURIComponent(base64Image.split(',')[1])

    // 在FintechCard01中的analyzeImage函数中，调用updateAnalysisResult
    try {
      const response = await axios.post(apiUrl, `image=${imageEncoded}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      console.log(response.data) // 打印API响应数据
      updateAnalysisResult(response.data.result) // 使用API响应更新分析结果
    } catch (error) {
      console.error('Error analyzing image:', error)
      alert('Error analyzing image.')
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  return (
    <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          上传你的照片
        </h2>
      </header>
      <div className="flex-grow p-5 flex flex-col items-center justify-center">
        <div className="text-center">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file" className="cursor-pointer">
            {!imageUrl ? (
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-indigo-500 mx-auto">
                {/* SVG Icon 或占位符 */}
                <div className="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        id="icon8-a">
                        <stop stopColor="#FFF" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fillRule="nonzero" fill="none">
                      <path
                        d="M18.648 35.069c.232.217.46.322.798.31.337-.012.558-.132.775-.365l1.95-2.094c1.028.414 2.504.813 4.076.758 1.798-.063 3.688-.692 5.426-2.441 3.686-3.956 4.05-12.862 4.038-13.199-.012-.337-.136-.67-.368-.888-.233-.217-.574-.317-.91-.306-.338.012-9.405 1.23-12.875 4.953-2.168 2.327-2.41 5.037-1.883 7.27l6.61-3.946-7.804 8.378a1.206 1.206 0 0 0 .167 1.57Z"
                        fill="#554FE8"
                      />
                      <path
                        d="M.353 17.663c.225.224.45.337.787.337s.562-.113.786-.337l2.024-2.026c1.011.45 2.473.9 4.046.9 1.799 0 3.71-.562 5.508-2.25C17.326 10.462 18 1.575 18 1.237c0-.337-.112-.675-.337-.9C17.438.113 17.1 0 16.763 0c-.337 0-9.441.9-13.038 4.5-2.248 2.25-2.585 4.95-2.136 7.2l6.744-3.712-8.093 8.1a1.206 1.206 0 0 0 .113 1.575Z"
                        fill="url(#icon8-a)"
                        transform="rotate(13 -42.427 83.827)"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
              />
            )}
          </label>
          {imageUrl && (
            <div className="mt-4 text-sm text-gray-600">点击图片以更改</div>
          )}
        </div>
      </div>
      <div className="text-center pb-5">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          onClick={analyzeImage}>
          分析图片
        </button>
      </div>
    </div>
  )
}

export default FintechCard01
