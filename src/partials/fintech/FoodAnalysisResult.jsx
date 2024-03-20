import React, { useState } from 'react'
import axios from 'axios'

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
                <th className="p-2">餐品名称</th>
                <th className="p-2">置信度</th>
                <th className="p-2">卡路里</th>
              </tr>
            </thead>
            <tbody>
              {analysisResult.map((row, index) => (
                <tr key={index} className="border-b dark:border-slate-600">
                  <td className="p-2 text-center">{row.name}</td>
                  <td className="p-2 text-center">
                    {(parseFloat(row.probability) * 100).toFixed(2)}%
                  </td>
                  <td className="p-2 text-center">
                    {row.has_calorie ? `${row.calorie} kcal` : 'N/A'}
                  </td>
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
