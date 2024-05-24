
export async function activate(licenseKey) {
    const method = "post";
    const endpoint = "https://api.lemonsqueezy.com/v1/licenses/activate";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return fetch(endpoint, {
      method,
      headers,
      body: new URLSearchParams({
        license_key: licenseKey,
        instance_name: "Freeze DOM before 1000",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  
  export async function validate(licenseKey, instanceId) {
    const endpoint = "https://api.lemonsqueezy.com/v1/licenses/validate";
  
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  
    return fetch(endpoint, {
      method: "post",
      headers,
      body: new URLSearchParams({
        license_key: licenseKey,
        instance_id: instanceId,
      }),
    });
  }
  