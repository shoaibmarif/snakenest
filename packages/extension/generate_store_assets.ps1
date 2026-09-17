Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "store-assets"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$fontSans = "Segoe UI"

function Create-24bppBitmap([int]$width, [int]$height) {
    return New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
}

function Setup-Graphics($g) {
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
}

function Draw-RoundedRect($g, $brush, $pen, [float]$x, [float]$y, [float]$w, [float]$h, [float]$radius) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    if ($brush -ne $null) { $g.FillPath($brush, $path) }
    if ($pen -ne $null) { $g.DrawPath($pen, $path) }
    $path.Dispose()
}

# -------------------------------------------------------------
# 1. STORE ICON (128 x 128 px, Solid No-Alpha PNG)
# -------------------------------------------------------------
function Generate-StoreIcon {
    $size = 128
    $bmp = Create-24bppBitmap $size $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    Setup-Graphics $g

    # Solid Dark Background
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 9, 13, 22))
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # Gradient Snake Body (128 scaled)
    $scale = $size / 64.0
    $snakePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 34, 197, 94), [float](9.5 * $scale))
    $snakePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $snakePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $snakePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $p1 = New-Object System.Drawing.PointF([float](14 * $scale), [float](42 * $scale))
    $p2 = New-Object System.Drawing.PointF([float](22 * $scale), [float](48 * $scale))
    $p3 = New-Object System.Drawing.PointF([float](30 * $scale), [float](42 * $scale))
    $p4 = New-Object System.Drawing.PointF([float](30 * $scale), [float](22 * $scale))
    $p5 = New-Object System.Drawing.PointF([float](38 * $scale), [float](16 * $scale))
    $p6 = New-Object System.Drawing.PointF([float](46 * $scale), [float](22 * $scale))
    $p7 = New-Object System.Drawing.PointF([float](46 * $scale), [float](30 * $scale))

    $g.DrawCurve($snakePen, [System.Drawing.PointF[]]@($p1, $p2, $p3, $p4, $p5, $p6, $p7))

    # Apple (Red)
    $appleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $appleRadius = [float](7.0 * $scale)
    $appleCenter = New-Object System.Drawing.PointF([float](20 * $scale), [float](20 * $scale))
    $g.FillEllipse($appleBrush, [float]($appleCenter.X - $appleRadius), [float]($appleCenter.Y - $appleRadius), [float]($appleRadius * 2), [float]($appleRadius * 2))

    # Leaf (Green)
    $leafPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 74, 222, 128), [float](2.4 * $scale))
    $leafPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $leafPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($leafPen, [float](20 * $scale), [float](13 * $scale), [float](24 * $scale), [float](10 * $scale))

    # Outer Subtle Border
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 2)
    $g.DrawRectangle($borderPen, 1, 1, $size - 2, $size - 2)

    $outPath = Join-Path $outDir "store-icon-128.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Output ("Created " + $outPath)
}

# -------------------------------------------------------------
# 2. SMALL PROMO TILE (440 x 280 px, No Alpha)
# -------------------------------------------------------------
function Generate-SmallPromoTile {
    $w = 440
    $h = 280
    $bmp = Create-24bppBitmap $w $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    Setup-Graphics $g

    # Dark Gradient Background
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($w, $h),
        [System.Drawing.Color]::FromArgb(255, 8, 12, 20),
        [System.Drawing.Color]::FromArgb(255, 15, 23, 42)
    )
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Ambient Emerald Glow Circle
    $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glowPath.AddEllipse(-50, -50, 260, 260)
    $pbg = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
    $pbg.CenterColor = [System.Drawing.Color]::FromArgb(60, 16, 185, 129)
    $pbg.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 8, 12, 20))
    $g.FillPath($pbg, $glowPath)
    $pbg.Dispose()
    $glowPath.Dispose()

    # Mascot Badge
    $iconX = 40
    $iconY = 42
    $iconSize = 58
    $badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 13, 19, 32))
    $badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 1.5)
    Draw-RoundedRect $g $badgeBrush $badgePen $iconX $iconY $iconSize $iconSize 14

    # Mini Snake Inside Badge
    $sScale = $iconSize / 64.0
    $sPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 34, 197, 94), [float](8.5 * $sScale))
    $sPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $sPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $p1 = New-Object System.Drawing.PointF([float]($iconX + 14 * $sScale), [float]($iconY + 42 * $sScale))
    $p2 = New-Object System.Drawing.PointF([float]($iconX + 22 * $sScale), [float]($iconY + 48 * $sScale))
    $p3 = New-Object System.Drawing.PointF([float]($iconX + 30 * $sScale), [float]($iconY + 42 * $sScale))
    $p4 = New-Object System.Drawing.PointF([float]($iconX + 30 * $sScale), [float]($iconY + 22 * $sScale))
    $p5 = New-Object System.Drawing.PointF([float]($iconX + 38 * $sScale), [float]($iconY + 16 * $sScale))
    $p6 = New-Object System.Drawing.PointF([float]($iconX + 46 * $sScale), [float]($iconY + 22 * $sScale))
    $p7 = New-Object System.Drawing.PointF([float]($iconX + 46 * $sScale), [float]($iconY + 30 * $sScale))
    $g.DrawCurve($sPen, [System.Drawing.PointF[]]@($p1, $p2, $p3, $p4, $p5, $p6, $p7))

    $aBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.FillEllipse($aBrush, [float]($iconX + 15 * $sScale), [float]($iconY + 15 * $sScale), [float](13 * $sScale), [float](13 * $sScale))

    # Version Pill
    $vBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 41, 59))
    $vPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 51, 65, 85), 1)
    Draw-RoundedRect $g $vBrush $vPen ($iconX + 70) ($iconY + 4) 52 20 5
    $vFont = New-Object System.Drawing.Font($fontSans, 8, [System.Drawing.FontStyle]::Bold)
    $vTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
    $g.DrawString("v1.0.0", $vFont, $vTextBrush, ($iconX + 79), ($iconY + 6))

    # Brand Title: SnakeNest
    $titleFont = New-Object System.Drawing.Font($fontSans, 24, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $greenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $g.DrawString("Snake", $titleFont, $whiteBrush, ($iconX + 70), ($iconY + 24))
    $g.DrawString("Nest", $titleFont, $greenBrush, ($iconX + 160), ($iconY + 24))

    # Subtitle
    $subFont = New-Object System.Drawing.Font($fontSans, 11, [System.Drawing.FontStyle]::Bold)
    $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240))
    $g.DrawString("Classic Retro Arcade in Your Browser", $subFont, $subBrush, 40, 118)

    $descFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Regular)
    $descBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
    $g.DrawString("4 battle modes, speed levels, retro sound & 100% offline play.", $descFont, $descBrush, 40, 140)

    # Feature Badges
    $badgeFont = New-Object System.Drawing.Font($fontSans, 8, [System.Drawing.FontStyle]::Bold)
    $pillBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 30, 48))
    $pillBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 1)
    $pillText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))

    $badges = @("Classic", "Endless", "Timed", "Obstacles")
    $bx = 40
    foreach ($b in $badges) {
        Draw-RoundedRect $g $pillBg $pillBorder $bx 175 75 26 7
        $g.DrawString($b, $badgeFont, $pillText, ($bx + 14), 180)
        $bx += 88
    }

    # Footer Highlight Bar
    $ftBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
    $ftPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 1)
    Draw-RoundedRect $g $ftBrush $ftPen 40 216 360 38 10

    $ftFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Bold)
    $calloutBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36))
    $g.DrawString("Offline Arcade Popup  *  No Ads  *  100% Free", $ftFont, $calloutBrush, 60, 227)

    # Outer Frame Border
    $framePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 1.5)
    $g.DrawRectangle($framePen, 0, 0, $w - 1, $h - 1)

    $outPath = Join-Path $outDir "promo-small.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Output ("Created " + $outPath)
}

# -------------------------------------------------------------
# 3. MARQUEE PROMO TILE (1400 x 560 px, No Alpha)
# -------------------------------------------------------------
function Generate-MarqueePromoTile {
    $w = 1400
    $h = 560
    $bmp = Create-24bppBitmap $w $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    Setup-Graphics $g

    # Deep Space Cyber Background
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($w, $h),
        [System.Drawing.Color]::FromArgb(255, 6, 9, 15),
        [System.Drawing.Color]::FromArgb(255, 13, 20, 36)
    )
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Ambient Dual Glows
    $glow1 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glow1.AddEllipse(-100, -100, 600, 600)
    $pbg1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow1)
    $pbg1.CenterColor = [System.Drawing.Color]::FromArgb(50, 16, 185, 129)
    $pbg1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 6, 9, 15))
    $g.FillPath($pbg1, $glow1)

    $glow2 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glow2.AddEllipse(($w - 500), 50, 600, 600)
    $pbg2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2)
    $pbg2.CenterColor = [System.Drawing.Color]::FromArgb(40, 59, 130, 246)
    $pbg2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 6, 9, 15))
    $g.FillPath($pbg2, $glow2)

    # Left Section: Brand & Headlines
    $lx = 90

    # Top Tag
    $tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $tagFont = New-Object System.Drawing.Font($fontSans, 12, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("RETRO ARCADE EXTENSION  *  MANIFEST V3", $tagFont, $tagBrush, $lx, 85)

    # Large Main Headline
    $h1Font = New-Object System.Drawing.Font($fontSans, 44, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $greenBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $g.DrawString("Snake", $h1Font, $whiteBrush, $lx, 115)
    $g.DrawString("Nest", $h1Font, $greenBrush, ($lx + 155), 115)

    # Main Tagline
    $taglineFont = New-Object System.Drawing.Font($fontSans, 20, [System.Drawing.FontStyle]::Bold)
    $subColor = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240))
    $g.DrawString("Play the Legendary Snake Game Anytime in Chrome", $taglineFont, $subColor, $lx, 195)

    # Description Paragraph
    $pFont = New-Object System.Drawing.Font($fontSans, 13, [System.Drawing.FontStyle]::Regular)
    $pColor = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))
    $g.DrawString("Experience seamless edge-to-edge slithering with 4 dynamic game modes, synthesized`n8-bit audio, local high-score tracking, and instant dark/light themes.", $pFont, $pColor, $lx, 238)

    # 4 Feature Card Pills
    $fItems = @(
        @("4 Battle Modes", "Classic, Endless, Timed, Obstacles"),
        @("Sound Engine", "Web Audio API retro sound synthesis"),
        @("Keyboard & Fast", "Zero lag, WASD & Arrow key navigation"),
        @("100% Offline", "No ads, no tracking, pure arcade fun")
    )
    $fx = $lx
    $fy = 325
    $cardBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
    $cardBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 1.5)
    $cardTitleFont = New-Object System.Drawing.Font($fontSans, 11, [System.Drawing.FontStyle]::Bold)
    $cardDescFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Regular)
    $cTitleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
    $cDescBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

    for ($i = 0; $i -lt 4; $i++) {
        $row = [int]($i / 2)
        $col = $i % 2
        $cx = $fx + ($col * 290)
        $cy = $fy + ($row * 80)
        Draw-RoundedRect $g $cardBg $cardBorder $cx $cy 275 66 12
        $g.DrawString($fItems[$i][0], $cardTitleFont, $cTitleBrush, ($cx + 16), ($cy + 12))
        $g.DrawString($fItems[$i][1], $cardDescFont, $cDescBrush, ($cx + 16), ($cy + 34))
    }

    # Right Section: Simulated Realistic Extension Popup Preview
    $rx = 840
    $ry = 60
    $rw = 470
    $rh = 440

    # Glow under popup
    $pGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pGlow.AddEllipse(($rx - 20), ($ry - 20), ($rw + 40), ($rh + 40))
    $pGlowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($pGlow)
    $pGlowBrush.CenterColor = [System.Drawing.Color]::FromArgb(60, 16, 185, 129)
    $pGlowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 6, 9, 15))
    $g.FillPath($pGlowBrush, $pGlow)

    # Popup Window Frame
    $popBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 9, 13, 22))
    $popBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 2)
    Draw-RoundedRect $g $popBg $popBorder $rx $ry $rw $rh 20

    # Header Inside Mockup
    $popHFont = New-Object System.Drawing.Font($fontSans, 14, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("Snake", $popHFont, $whiteBrush, ($rx + 25), ($ry + 18))
    $g.DrawString("Nest", $popHFont, $greenBrush, ($rx + 68), ($ry + 18))
    $verFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Bold)
    $vBadgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 41, 59))
    $vBadgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 51, 65, 85), 1)
    Draw-RoundedRect $g $vBadgeBg $vBadgePen ($rx + 115) ($ry + 19) 48 18 5
    $g.DrawString("v1.0.0", $verFont, $cDescBrush, ($rx + 122), ($ry + 21))

    # HUD Cards Inside Mockup
    $hudBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
    $hudBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 1)
    $hudW = 125
    $hudH = 50
    $hudY = $ry + 54

    Draw-RoundedRect $g $hudBg $hudBorder ($rx + 25) $hudY $hudW $hudH 10
    Draw-RoundedRect $g $hudBg $hudBorder ($rx + 172) $hudY $hudW $hudH 10
    Draw-RoundedRect $g $hudBg $hudBorder ($rx + 320) $hudY $hudW $hudH 10

    $lblFont = New-Object System.Drawing.Font($fontSans, 8, [System.Drawing.FontStyle]::Bold)
    $valFont = New-Object System.Drawing.Font($fontSans, 13, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("SCORE", $lblFont, $cDescBrush, ($rx + 60), ($hudY + 8))
    $g.DrawString("124", $valFont, $whiteBrush, ($rx + 68), ($hudY + 23))

    $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $g.DrawString("BEST", $lblFont, $goldBrush, ($rx + 215), ($hudY + 8))
    $g.DrawString("340", $valFont, $goldBrush, ($rx + 217), ($hudY + 23))

    $redBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.DrawString("APPLES", $lblFont, $redBrush, ($rx + 355), ($hudY + 8))
    $g.DrawString("31", $valFont, $redBrush, ($rx + 372), ($hudY + 23))

    # Canvas Arena Inside Mockup
    $arenaBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 6, 9, 15))
    $arenaBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 1)
    $arenaX = $rx + 25
    $arenaY = $ry + 118
    $arenaW = $rw - 50
    $arenaH = 220
    Draw-RoundedRect $g $arenaBg $arenaBorder $arenaX $arenaY $arenaW $arenaH 14

    # Snake Trail inside Arena
    $mockSnakePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 34, 197, 94), 14)
    $mockSnakePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $mockSnakePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $mockSnakePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $sp1 = New-Object System.Drawing.PointF([float]($arenaX + 50), [float]($arenaY + 160))
    $sp2 = New-Object System.Drawing.PointF([float]($arenaX + 160), [float]($arenaY + 160))
    $sp3 = New-Object System.Drawing.PointF([float]($arenaX + 160), [float]($arenaY + 80))
    $sp4 = New-Object System.Drawing.PointF([float]($arenaX + 320), [float]($arenaY + 80))
    $g.DrawLines($mockSnakePen, [System.Drawing.PointF[]]@($sp1, $sp2, $sp3, $sp4))

    # Head Eyes
    $eyeWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $eyeBlack = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
    $g.FillEllipse($eyeWhite, [float]($arenaX + 322), [float]($arenaY + 73), 7, 7)
    $g.FillEllipse($eyeBlack, [float]($arenaX + 325), [float]($arenaY + 75), 3, 3)
    $g.FillEllipse($eyeWhite, [float]($arenaX + 322), [float]($arenaY + 82), 7, 7)
    $g.FillEllipse($eyeBlack, [float]($arenaX + 325), [float]($arenaY + 84), 3, 3)

    # Food Apple
    $appleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.FillEllipse($appleBrush, [float]($arenaX + 370), [float]($arenaY + 74), 16, 16)
    $g.FillEllipse($goldBrush, [float]($arenaX + 240), [float]($arenaY + 140), 16, 16)

    # Mode Selector Inside Mockup
    $modeBtnBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $modeBtnFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Bold)
    Draw-RoundedRect $g $modeBtnBg $null ($arenaX + 4) ($ry + 355) 96 30 7
    $g.DrawString("Classic", $modeBtnFont, $whiteBrush, ($arenaX + 28), ($ry + 362))

    $modeInactiveBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
    Draw-RoundedRect $g $modeInactiveBg $hudBorder ($arenaX + 110) ($ry + 355) 96 30 7
    $g.DrawString("Endless", $modeBtnFont, $cDescBrush, ($arenaX + 134), ($ry + 362))

    Draw-RoundedRect $g $modeInactiveBg $hudBorder ($arenaX + 216) ($ry + 355) 96 30 7
    $g.DrawString("Timed", $modeBtnFont, $cDescBrush, ($arenaX + 244), ($ry + 362))

    Draw-RoundedRect $g $modeInactiveBg $hudBorder ($arenaX + 320) ($ry + 355) 96 30 7
    $g.DrawString("Obstacles", $modeBtnFont, $cDescBrush, ($arenaX + 338), ($ry + 362))

    # Outer Frame
    $outerBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 2)
    $g.DrawRectangle($outerBorder, 0, 0, $w - 1, $h - 1)

    $outPath = Join-Path $outDir "promo-marquee.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Output ("Created " + $outPath)
}

# -------------------------------------------------------------
# 4. STORE SCREENSHOTS (1280 x 800 px, No Alpha)
# -------------------------------------------------------------
function Generate-StoreScreenshot(
    [string]$fileName,
    [string]$badgeText,
    [string]$mainTitle,
    [string]$subtitle,
    [string]$feature1,
    [string]$feature2,
    [string]$feature3,
    [bool]$isDarkTheme
) {
    $w = 1280
    $h = 800
    $bmp = Create-24bppBitmap $w $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    Setup-Graphics $g

    # Studio Presentation Background
    $bgColor1 = if ($isDarkTheme) { [System.Drawing.Color]::FromArgb(255, 7, 10, 18) } else { [System.Drawing.Color]::FromArgb(255, 241, 245, 249) }
    $bgColor2 = if ($isDarkTheme) { [System.Drawing.Color]::FromArgb(255, 15, 23, 42) } else { [System.Drawing.Color]::FromArgb(255, 226, 232, 240) }

    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($w, $h),
        $bgColor1,
        $bgColor2
    )
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Ambient Accent Glow
    $glowColor = if ($isDarkTheme) { [System.Drawing.Color]::FromArgb(45, 16, 185, 129) } else { [System.Drawing.Color]::FromArgb(35, 16, 185, 129) }
    $gPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gPath.AddEllipse(100, 100, 700, 700)
    $pbg = New-Object System.Drawing.Drawing2D.PathGradientBrush($gPath)
    $pbg.CenterColor = $glowColor
    $pbg.SurroundColors = @($bgColor1)
    $g.FillPath($pbg, $gPath)

    # Left Column: Marketing Typography
    $lx = 80
    $badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $badgeTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $badgeFont = New-Object System.Drawing.Font($fontSans, 11, [System.Drawing.FontStyle]::Bold)
    Draw-RoundedRect $g $badgeBg $null $lx 110 240 32 8
    $g.DrawString($badgeText, $badgeFont, $badgeTextBrush, ($lx + 16), 116)

    $titleFont = New-Object System.Drawing.Font($fontSans, 38, [System.Drawing.FontStyle]::Bold)
    $titleBrush = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) }
    $g.DrawString($mainTitle, $titleFont, $titleBrush, $lx, 160)

    $subFont = New-Object System.Drawing.Font($fontSans, 14, [System.Drawing.FontStyle]::Regular)
    $subBrush = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 71, 85, 105)) }
    $g.DrawString($subtitle, $subFont, $subBrush, $lx, 260)

    # 3 Checkmark Feature Points
    $featY = 345
    $featFont = New-Object System.Drawing.Font($fontSans, 12, [System.Drawing.FontStyle]::Bold)
    $checkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $featBrush = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 41, 59)) }

    $features = @($feature1, $feature2, $feature3)
    foreach ($f in $features) {
        $g.FillEllipse($checkBrush, [float]$lx, [float]($featY + 3), 18, 18)
        $checkMarkFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Bold)
        $g.DrawString("v", $checkMarkFont, $badgeTextBrush, [float]($lx + 4), [float]($featY + 3))
        $g.DrawString($f, $featFont, $featBrush, ($lx + 32), $featY)
        $featY += 50
    }

    # Play Online Callout
    $linkCardBg = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White) }
    $linkCardBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 1.5)
    Draw-RoundedRect $g $linkCardBg $linkCardBorder $lx 535 440 70 14
    $calloutTitleFont = New-Object System.Drawing.Font($fontSans, 11, [System.Drawing.FontStyle]::Bold)
    $calloutDescFont = New-Object System.Drawing.Font($fontSans, 9, [System.Drawing.FontStyle]::Regular)
    $g.DrawString("Full Web Game & Creator Socials Included", $calloutTitleFont, $checkBrush, ($lx + 18), 548)
    $g.DrawString("Play fullscreen on snakenest.netlify.app or in the popup!", $calloutDescFont, $subBrush, ($lx + 18), 572)

    # Right Column: Actual Real Popup Mockup
    $px = 640
    $py = 90
    $pw = 550
    $ph = 620

    # Mockup Drop Shadow
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 3, 5, 8))
    Draw-RoundedRect $g $shadowBrush $null ($px + 12) ($py + 12) $pw $ph 24

    # Popup Body
    $popBg = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 2, 6, 23)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White) }
    $popBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 1.5)
    Draw-RoundedRect $g $popBg $popBorder $px $py $pw $ph 20

    # Header Inside Mockup
    $g.DrawString("Snake", $titleFont, $titleBrush, ($px + 28), ($py + 20))
    $g.DrawString("Nest", $titleFont, $checkBrush, ($px + 140), ($py + 20))

    # Mode/Score Display
    $scBg = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 241, 245, 249)) }
    Draw-RoundedRect $g $scBg $popBorder ($px + 28) ($py + 85) 150 65 12
    Draw-RoundedRect $g $scBg $popBorder ($px + 200) ($py + 85) 150 65 12
    Draw-RoundedRect $g $scBg $popBorder ($px + 372) ($py + 85) 150 65 12

    $scValFont = New-Object System.Drawing.Font($fontSans, 18, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("SCORE", $badgeFont, $subBrush, ($px + 72), ($py + 95))
    $g.DrawString("42", $scValFont, $titleBrush, ($px + 85), ($py + 115))

    $g.DrawString("BEST", $badgeFont, [System.Drawing.Brushes]::Orange, ($px + 250), ($py + 95))
    $g.DrawString("128", $scValFont, [System.Drawing.Brushes]::Orange, ($px + 255), ($py + 115))

    $g.DrawString("APPLES", $badgeFont, [System.Drawing.Brushes]::Red, ($px + 418), ($py + 95))
    $g.DrawString("18", $scValFont, [System.Drawing.Brushes]::Red, ($px + 434), ($py + 115))

    # Arena Canvas Area
    $arenaBg = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 9, 13, 22)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 250, 252)) }
    $arenaPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 1)
    $aW = $pw - 56
    $aH = 340
    Draw-RoundedRect $g $arenaBg $arenaPen ($px + 28) ($py + 168) $aW $aH 16

    # Slithering Snake Drawing
    $snakeBodyPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 16)
    $snakeBodyPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $snakeBodyPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $snakeBodyPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $sp1 = New-Object System.Drawing.PointF([float]($px + 90), [float]($py + 420))
    $sp2 = New-Object System.Drawing.PointF([float]($px + 260), [float]($py + 420))
    $sp3 = New-Object System.Drawing.PointF([float]($px + 260), [float]($py + 260))
    $sp4 = New-Object System.Drawing.PointF([float]($px + 420), [float]($py + 260))
    $sp5 = New-Object System.Drawing.PointF([float]($px + 420), [float]($py + 340))
    $g.DrawLines($snakeBodyPen, [System.Drawing.PointF[]]@($sp1, $sp2, $sp3, $sp4, $sp5))

    # Snake Eyes
    $g.FillEllipse([System.Drawing.Brushes]::White, [float]($px + 413), [float]($py + 342), 8, 8)
    $g.FillEllipse([System.Drawing.Brushes]::Black, [float]($px + 416), [float]($py + 345), 3, 3)
    $g.FillEllipse([System.Drawing.Brushes]::White, [float]($px + 422), [float]($py + 342), 8, 8)
    $g.FillEllipse([System.Drawing.Brushes]::Black, [float]($px + 424), [float]($py + 345), 3, 3)

    # Apples & Gems
    $appleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.FillEllipse($appleBrush, [float]($px + 140), [float]($py + 230), 20, 20)
    $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36))
    $g.FillEllipse($goldBrush, [float]($px + 360), [float]($py + 430), 22, 22)

    # Mode Selector Tabs
    $btnFont = New-Object System.Drawing.Font($fontSans, 10, [System.Drawing.FontStyle]::Bold)
    $mActive = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
    $mInactive = if ($isDarkTheme) { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) } else { New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240)) }

    Draw-RoundedRect $g $mActive $null ($px + 28) ($py + 524) 115 36 8
    $g.DrawString("Classic", $btnFont, $badgeTextBrush, ($px + 60), ($py + 532))

    Draw-RoundedRect $g $mInactive $null ($px + 154) ($py + 524) 115 36 8
    $g.DrawString("Endless", $btnFont, $subBrush, ($px + 185), ($py + 532))

    Draw-RoundedRect $g $mInactive $null ($px + 280) ($py + 524) 115 36 8
    $g.DrawString("Timed", $btnFont, $subBrush, ($px + 316), ($py + 532))

    Draw-RoundedRect $g $mInactive $null ($px + 406) ($py + 524) 115 36 8
    $g.DrawString("Obstacles", $btnFont, $subBrush, ($px + 428), ($py + 532))

    # Outer Border
    $outerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 41, 59), 2)
    $g.DrawRectangle($outerPen, 0, 0, $w - 1, $h - 1)

    $outPath = Join-Path $outDir $fileName
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Output ("Created " + $outPath)
}

# Run generation for all assets
Generate-StoreIcon
Generate-SmallPromoTile
Generate-MarqueePromoTile

Generate-StoreScreenshot `
    "screenshot-1-arcade-dark.png" `
    "ARCADE POPUP ACTION" `
    "Classic Retro Snake`nIn Your Browser" `
    "Play instantly with arrow keys or WASD.`nSmooth 60fps canvas, local high scores, and zero ads." `
    "Smooth responsive controls (Arrow Keys / WASD)" `
    "Synthesized Web Audio 8-bit sound effects" `
    "Local high-score tracking & statistics saved" `
    $true

Generate-StoreScreenshot `
    "screenshot-2-modes-light.png" `
    "4 BATTLE MODES" `
    "Classic, Endless,`nTimed & Obstacles" `
    "Switch between 4 arcade battle modes and 4 speed`ndifficulties (Easy to Expert) with one click." `
    "Classic mode with boundary collisions" `
    "Endless mode with border wrap-around" `
    "Time Challenge with ticking countdown & special bonus gems" `
    $false

Generate-StoreScreenshot `
    "screenshot-3-themes-web.png" `
    "THEMES & FULLSCREEN WEB" `
    "Seamless Dark/Light`n& Fullscreen Web" `
    "Enjoy borderless clean aesthetics tailored for modern`nbrowsers, with one-click launch to the live Web App." `
    "Dark Mode & Light Mode one-tap toggle" `
    "One-click Web App button for full-screen desktop gaming" `
    "100% Offline capability with zero network lag" `
    $true
