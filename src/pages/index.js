import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Secret Santa"/>
    <p>Welcome to a straightforward Secret Santa generator to create your secret pairings.</p>
    <p>Enter the names of the participants separated by commas in the text box below. 
      Ensure that no names are repeated and that there are more than two participants.</p>
    <p>Click the button to generate pairings.</p>
    <p>A link to a text file will be generated per participant with the corresponding title.
      The contents of the file reveal the pairing for the participant named in the title. 
      Send the text file titled X to the participant named X.</p>
    <p><b>Merry Christmas!</b></p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
  </Layout>
)

export default IndexPage
