import React, { useState } from 'react'

import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import FintechCard01 from '../partials/fintech/HandImageUploader'
import FintechCard05 from '../partials/fintech/HandAnalysisResult'

function Fintech() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [imageBase64, setImageBase64] = useState('')
  const [analysisResult, setAnalysisResult] = useState([]) // 状态保存分析结果

  // 更新图片Base64编码的函数
  const onImageSelected = (base64) => {
    setImageBase64(base64)
  }

  // FintechCard01完成分析后更新分析结果的函数
  const updateAnalysisResult = (result) => {
    setAnalysisResult(result) // 更新分析结果状态
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  手势识别 ✨
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <FintechCard01
                onImageSelected={onImageSelected}
                updateAnalysisResult={updateAnalysisResult}
              />
              <FintechCard05 analysisResult={analysisResult} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Fintech
