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

    // Function to replace spaces with underscores
    const replaceSpaces = input => input.replace(/ /g, "_")

    // Replace spaces in input values
    const updatedRefValue = replaceSpaces(refValue)
    const updatedSource = replaceSpaces(source)
    const updatedMedium = replaceSpaces(medium)
    const updatedCampaign = replaceSpaces(campaign)

    // Ensuring base URL does not end with a slash or have query parameters
    let cleanUrl = url.replace(/\/?(\?.*)?$/, "")

    // Constructing final URL with proper encoding and syntax
    const queryParams = new URLSearchParams({
      ref: updatedRefValue,
      utm_source: updatedSource,
      utm_medium: updatedMedium,
      utm_campaign: updatedCampaign
    }).toString()

    const final_url = `${cleanUrl}?${queryParams}`
    setFinalUrl(final_url)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>PlanB Campaign URL Builder</h1>
      </header>
      {/* <form onSubmit={onSubmitUrl}>
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
      </form> */}
      <div className="columns">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-8 col-sm-12">
              <form onSubmit={onSubmitUrl}>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    URL*
                  </label>
                  <input type="text" className="form-control" id="url" value={url} onChange={e => setUrl(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="refValue" className="form-label">
                    Ref Value (any custom name that describes the campaign)*
                  </label>
                  <input type="text" className="form-control" id="refValue" value={refValue} onChange={e => setRefValue(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="source" className="form-label">
                    Campaign Source*
                  </label>
                  <input type="text" className="form-control" id="source" value={source} onChange={e => setSource(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="medium" className="form-label">
                    Campaign Medium*
                  </label>
                  <input type="text" className="form-control" id="medium" value={medium} onChange={e => setMedium(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="term" className="form-label">
                    Campaign Name*
                  </label>
                  <input type="text" className="form-control" id="term" value={campaign} onChange={e => setCampaign(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container result">
          <p>This tool allows you to easily add campaign parameters to URLs so you can measure Custom Campaigns in Matomo Analytics including the REF parameter. </p>
          <p>Enter the website URL and campaign information Fill out all fields marked with an asterisk (*), and the campaign URL will be generated for you.</p>
          <div className="utm-explanation">
            <div >
              <strong style={{ color: "white" }}>Campaign Source:</strong>
              <p>
                Identifies the source of your traffic, such as a search engine, newsletter, or other referral. <br />
                <em>Example:</em> utm_source=newsletter
              </p>
            </div>

            <div >
              <strong style={{ color: "white" }}>Campaign Medium:</strong>
              <p>
                Describes the medium used to reach your site, such as email, CPC, social media, affiliate, or QR code. <br />
                <em>Example:</em> utm_medium=email
              </p>
            </div>

            <div >
              <strong style={{ color: "white" }}>Campaign Name:</strong>
              <p>
                Specifies the individual campaign name, slogan, promo code, or specific promotion associated with your link. <br />
                <em>Example:</em> utm_campaign=spring_sale
              </p>
            </div>

          </div>
          {finalUrl && (
            <div className="final">
              <div className="url-result">
                <h2 style={{ color: "red" }}>Url to share is: </h2>
                <a href={finalUrl} target="_blank" rel="noopener noreferrer">
                  {finalUrl}
                </a>
              </div>
              <button className="btn btn-secondary mt-3" onClick={copyToClipboard}>
                Copy to Clipboard
              </button>
              {copySuccess && <div className="copy-message">{copySuccess}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
