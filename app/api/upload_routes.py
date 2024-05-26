# import os
# import boto3
# from flask import Blueprint, request, jsonify
# from flask_login import login_required
# from werkzeug.utils import secure_filename

# s3 = boto3.client('s3',
#         aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
#         aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
#         region_name=os.getenv('AWS_REGION'))

# upload_routes = Blueprint('uploads', __name__)

# @upload_routes.route('upload', methods=['POST'])
# @login_required
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400
#     file = request.files['file']
#     if file.fileame == '':
#         return jsonify({'error': 'No selected file'}), 400
#     filename = secure_filename(file.filename)
#     try:
#         s3.upload_fileobj(
#             file,
#             os.getenv('S3_BUCKET_NAME'),
#             filename,
#             ExtraArgs={
#                 'ACL': 'public-read',
#                 'ContentType': file.content_type
#             }
#         )
#         file_url = f"https://{os.getenv('S3_BUCKET_NAME')}.s3.amazonaws.com/{filename}"
#         return jsonify({'file_url': file_url}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
