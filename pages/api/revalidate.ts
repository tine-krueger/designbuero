import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //Check for POST request
    if (req.method !== 'POST') {
        res
            .status(400)
            .json({error: 'Invalid HTTP method. Only POST requests are allowed'})
    }

    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {

        // Check that body is not empty
        const body = req.body
        if (!body) {
            res
                .status(400)
                .send('Bad request (no body)')
            return
        }
        // get the slug to revalidate from body
    
        const pathToRevalidate = body.pathToRevalidate
        if (pathToRevalidate) {
            await res.unstable_revalidate(`${pathToRevalidate}`)
            return res.json({revalidated: true })
        }
        
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }