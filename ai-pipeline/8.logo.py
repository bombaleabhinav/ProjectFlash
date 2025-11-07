from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip


parser = argparse.ArgumentParser(description="Pass absolute path to reference audio file")
parser.add_argument(
    "-p", "--ref_photo",
    type=str,
    required=True,
    help="Absolute path to reference audio file (e.g., D:/Flash/audio/voice.mp3)"
)
args = parser.parse_args()



def burn_logo(
    input_video: str,
    logo_path: str,
    output_video: str = "output_with_logo.mp4",
    corner: str = "br",          # tl, tr, bl, br
    margin: int = 24,            # pixels from edges
    logo_width: int | None = None,  # px; if None, uses 12% of video width
    opacity: float = 1.0         # 0.0–1.0
):
    # Load base video
    base = VideoFileClip(input_video)

    # Load logo and size it
    logo = ImageClip(logo_path).set_duration(base.duration).set_opacity(opacity)
    if logo_width is None:
        logo = logo.resize(width=int(base.w * 0.12))
    else:
        logo = logo.resize(width=logo_width)

    # Corner positions
    corner = corner.lower()
    if corner not in {"tl", "tr", "bl", "br"}:
        corner = "br"

    def position(_t):
        x = margin if corner in {"tl", "bl"} else base.w - logo.w - margin
        y = margin if corner in {"tl", "tr"} else base.h - logo.h - margin
        return (x, y)

    logo = logo.set_pos(position)

    # Composite and write
    out = CompositeVideoClip([base, logo])
    out.write_videofile(
        output_video,
        codec="libx264",
        audio_codec="aac",
        fps=base.fps,
        preset="medium",
        threads=4
    )

if __name__ == "__main__":
    txt_folder  = "current_folder.txt"
    with open(txt_folder, "r") as f:
        folder_path_my = f.read().strip()  # The latest folder path

    burn_logo(
        input_video=rf"D:/Flash/All Videos/{folder_path_my}/final_with_subtitles.mp4",
        logo_path=args.ref_photo,
        output_video=rf"D:/Flash/All Videos/{folder_path_my}/final_with_subtitles_logo.mp4",
        corner="tl",   # <-- top-left corner
        margin=24,
        logo_width=None,  # or set e.g. 200
        opacity=1.0
    )


