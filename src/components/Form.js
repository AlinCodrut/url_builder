import React from "react"
import { useState } from "react"

function Form() {
  const [refValue, setRefValue] = useState('')
  const [campaign, setCampaign] =useState('')
  const [medium, setMedium] = useState('')
  const [term, setTerm] = useState('')
  const [url, setUrl] = useState('')
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="refValue" className="form-label">
            Ref Value (any custom name that describes the campaign)
          </label>
          <input type="text" className="form-control" id="refValue" value={refValue} onChange={e => setRefValue(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="source" className="form-label">
            Campaign Source
          </label>
          <input type="text" className="form-control" id="source" value={campaign} onChange={e => setCampaign(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="medium" className="form-label">
            Campaign Medium
          </label>
          <input type="text" className="form-control" id="medium" value={medium} onChange={e => setMedium(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="term" className="form-label">
            Campaign Name
          </label>
          <input type="text" className="form-control" id="term" value={term} onChange={e => setTerm(e.target.value)} required />
        </div>
      </form>
    </>
  )
}

export default Form
