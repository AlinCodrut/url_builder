import { useState } from "react"
import logo from "./logo.png"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

function App() {
  const [refValue, setRefValue] = useState("")
  const [source, setSource] = useState("")
  const [medium, setMedium] = useState("")
  const [campaign, setCampaign] = useState("")
  const [url, setUrl] = useState("")
  const [finalUrl, setFinalUrl] = useState("")
  const [copySuccess, setCopySuccess] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(finalUrl)
      .then(() => {
        setCopySuccess("Copied!")
        setTimeout(() => setCopySuccess(""), 2000) // Reset message after 2 seconds
      })
      .catch(err => console.error("Error copying text: ", err))
  }

  const onSubmitUrl = e => {
    e.preventDefault()

    if (!/^https?:\/\//i.test(url)) {
      alert("URL must start with http:// or https://")
      return // Stop further execution
    }

    // Ensuring base URL does not end with a slash or have query parameters
    let cleanUrl = url.replace(/\/?(\?.*)?$/, "")

    // Constructing final URL with proper encoding and syntax
    const queryParams = new URLSearchParams({
      ref: refValue,
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign
    }).toString()

    const final_url = `${cleanUrl}?${queryParams}`
    setFinalUrl(final_url)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PlanB Campaign URL Builder</p>
      </header>
      <form onSubmit={onSubmitUrl}>
        <label htmlFor="url">URL</label>
        <input type="text" id="url" value={url} onChange={e => setUrl(e.target.value)} required />

        <label htmlFor="refValue">Ref Value (any custom name that describes the campaign)</label>
        <input type="text" id="refValue" value={refValue} onChange={e => setRefValue(e.target.value)} required />

        <label htmlFor="source">Campaign Source</label>
        <input type="text" id="source" value={source} onChange={e => setSource(e.target.value)} required />

        <label htmlFor="medium">Campaign Medium</label>
        <input type="text" id="medium" value={medium} onChange={e => setMedium(e.target.value)} required />

        <label htmlFor="term">Campaign Name</label>
        <input type="text" id="term" value={campaign} onChange={e => setCampaign(e.target.value)} required />
        <button type="submit" class="btn btn-primary submit">
          Submit
        </button>
      </form>
      {finalUrl && (
        <div className="final">
          <h2 > <h2 style={{ color: 'red' }}>Url to share is: </h2>{finalUrl}</h2>
          <button className="btn btn-secondary" onClick={copyToClipboard}>
            Copy to Clipboard
          </button>
          {copySuccess && <div className="copy-message">{copySuccess}</div>}
        </div>
      )}
    </div>
  )
}

export default App
