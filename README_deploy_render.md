# Deploying to Render.com

This guide will help you deploy your FastAPI backend and React frontend to Render.com for free.

---

## 1. Deploy the FastAPI Backend

1. Go to https://dashboard.render.com/ and sign up/log in.
2. Click **"New +"** → **"Web Service"**.
3. Connect your GitHub and select this repository.
4. Fill out the form as follows:
   - **Name:** excel-similarity-backend (or your choice)
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn backend.app.main:app --host 0.0.0.0 --port 10000`
   - **Root Directory:** (leave blank or set if your repo structure is different)
   - **Port:** 10000 (Render will auto-detect if you use `uvicorn` as above)
5. Click **Create Web Service**.
6. Wait for the build and deployment to finish. Note the public URL Render gives you (e.g., `https://excel-similarity-backend.onrender.com`).

---

## 2. Deploy the React Frontend

1. In Render, click **"New +"** → **"Static Site"**.
2. Connect your GitHub and select this repository.
3. Fill out the form as follows:
   - **Name:** excel-similarity-frontend (or your choice)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `frontend/build`
4. Click **Create Static Site**.
5. Wait for the build and deployment to finish. Note the public URL Render gives you (e.g., `https://excel-similarity-frontend.onrender.com`).

---

## 3. Connect Frontend to Backend

- Update your React app to use the Render backend URL for API calls (e.g., in your `.env` or directly in the code).
- Redeploy the frontend if you make changes.

---

## 4. (Optional) Set Environment Variables

- In Render, go to your service’s settings to add any environment variables needed by your backend or frontend.

---

## 5. Troubleshooting

- If you see CORS errors, add the frontend URL to your FastAPI CORS allowlist.
- If the backend sleeps after 15 minutes of inactivity, this is normal on Render’s free tier.

---

## 6. Useful Links
- Render Docs: https://render.com/docs
- FastAPI Deploy Guide: https://render.com/docs/deploy-fastapi
- React Deploy Guide: https://render.com/docs/deploy-create-react-app

---

If you need further help, let me know!
