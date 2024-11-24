import type { APIRoute } from 'astro';

interface LicenseActivateRequestBody {
  license_key: string;
  instance_name: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the JSON body from the incoming request
    const reqData = await request.json() as LicenseActivateRequestBody;
    const { license_key, instance_name } = reqData;

    // Check for missing parameters
    if (!license_key || !instance_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Make the API request to Lemon Squeezy
    const response = await fetch(
      'https://api.lemonsqueezy.com/v1/licenses/activate',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({ license_key, instance_name }),
      }
    );

    // If the response is not okay, return the error
    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Return successful response
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error activating license:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to activate license' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}