from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pdfplumber
from docx import Document
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('punkt_tab')
# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Folder where uploaded files will be stored temporarily
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Stopwords for filtering common English words
stop_words = set(stopwords.words('english'))

# Predefined technical skills (can be expanded as needed)
TECHNICAL_SKILLS = {
    "python", "javascript", "react", "git", "html", "css", "java", "c", "sql", "nodejs", "docker", "kubernetes",
    "typescript", "go", "scala", "linux", "flask", "django", "angular", "spring", "aws", "azure", "gcp"
}

# Helper function to extract text from a file
def extract_text(file_path):
    text = ""
    if file_path.endswith('.pdf'):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + " "
    elif file_path.endswith('.docx'):
        doc = Document(file_path)
        for paragraph in doc.paragraphs:
            text += paragraph.text + " "
    return text.lower()

# Function to extract relevant skills from text
def extract_skills(text):
    words = word_tokenize(text.lower())
    # Filter out stop words and keep only technical skills
    skills = {word for word in words if word in TECHNICAL_SKILLS and word not in stop_words}
    return skills

# Endpoint for file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    if 'jobDescription' not in request.form:
        return jsonify({'error': 'No job description provided'}), 400

    file = request.files['file']
    job_description = request.form['jobDescription']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        return jsonify({'error': 'Invalid file type. Only PDF and DOCX are allowed.'}), 400

    # Save the file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    try:
        # Extract text from the uploaded resume
        resume_text = extract_text(file_path)

        # Extract skills from job description and resume
        job_skills = extract_skills(job_description)
        resume_skills = extract_skills(resume_text)

        # Calculate ATS score
        matched_skills = job_skills & resume_skills
        missing_skills = job_skills - resume_skills
        ats_score = (len(matched_skills) / len(job_skills)) * 100 if job_skills else 0

        return jsonify({
            'message': 'File uploaded successfully',
            'atsScore': round(ats_score, 2),
            'missingSkills': list(missing_skills)
        }), 200

    finally:
        # Cleanup: Delete the uploaded file after processing
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True)
