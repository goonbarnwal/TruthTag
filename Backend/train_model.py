from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Sample dataset (0 = genuine, 1 = scam)
texts = [
    "software engineer internship with interview",
    "paid internship with mentorship",
    "job offer no interview earn money fast",
    "telegram hiring work from home",
    "registration fee required urgent hiring",
    "company interview process and offer letter",
    "instant job whatsapp contact",
    "official company career page apply"
]

labels = [0, 0, 1, 1, 1, 0, 1, 0]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(X, labels)

# Save model + vectorizer
with open("scam_model.pkl", "wb") as f:
    pickle.dump((model, vectorizer), f)

print("✅ Scam ML model trained & saved")
