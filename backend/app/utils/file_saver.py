from pathlib import Path

uploads_dir = Path(__name__).parent.parent.parent / "uploads"
uploads_dir.mkdir(parents=True, exist_ok=True)

def save_file(file, file_id):
    file_ext = Path(file.filename).suffix
    file_path = uploads_dir / f"{file_id}{file_ext}"
    with file_path.open("wb") as f:
        f.write(file.file.read())
    return file_path