import React from 'react'

// 创建映射，以类别名为键，手势名称为值
const gestureNames = {
  One: '数字1（原食指）',
  Five: '数字5（原掌心向前）',
  Fist: '拳头',
  OK: 'OK',
  Prayer: '祈祷',
  Congratulation: '作揖',
  Honour: '作别',
  Heart_single: '单手比心',
  Thumb_up: '点赞',
  Thumb_down: 'Diss',
  ILY: '我爱你',
  Palm_up: '掌心向上',
  Heart_1: '双手比心1',
  Heart_2: '双手比心2',
  Heart_3: '双手比心3',
  Two: '数字2',
  Three: '数字3',
  Four: '数字4',
  Six: '数字6',
  Seven: '数字7',
  Eight: '数字8',
  Nine: '数字9',
  Rock: 'Rock',
  Insult: '竖中指',
}

function FintechCard05({ analysisResult }) {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          分析结果
        </h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="p-2">类别</th>
                <th className="p-2">手势名称</th>
                <th className="p-2">置信度 (%)</th>
                <th className="p-2">位置</th>
                <th className="p-2">尺寸</th>
              </tr>
            </thead>
            <tbody>
              {analysisResult.map((result, index) => (
                <tr key={index} className="border-b dark:border-slate-600">
                  <td className="p-2 text-center">{result.classname}</td>
                  <td className="p-2 text-center">
                    {gestureNames[result.classname]}
                  </td>
                  <td className="p-2 text-center">
                    {(result.probability * 100).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">{`左: ${result.left}, 顶: ${result.top}`}</td>
                  <td className="p-2 text-center">{`宽: ${result.width}, 高: ${result.height}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FintechCard05
