local function is_arabic_number(str)
  return str:match("^%d+$") ~= nil
end

local function is_roman_number(str)
  return str:match("^[IVXLCDM]+$") ~= nil
end

local function header_text(el)
  return pandoc.utils.stringify(el.content)
    :upper()
    :gsub("^%s+", "")
    :gsub("%s+$", "")
end

function Header(el)
  if el.level >= 1 then
    local text = header_text(el)

    -- Only add page break if NOT roman or arabic
    if not is_arabic_number(text) and not is_roman_number(text) then

      -- LaTeX
      if FORMAT:match("latex") then
        return {
          pandoc.RawBlock("latex", "\\newpage"),
          el
        }

      -- HTML / EPUB
      elseif FORMAT:match("html") or FORMAT:match("epub") then
        el.attributes["style"] =
          (el.attributes["style"] or "") ..
          "break-before: page; page-break-before: always;"

        return el
      end
    end
  end

  return el
end
