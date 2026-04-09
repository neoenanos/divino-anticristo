function Pandoc(doc)
  local newblocks = {}
  local i = 1
  local blocks = doc.blocks

  while i <= #blocks do
    local el = blocks[i]

    -- If this is a verse header
    if el.t == "Header" and el.classes:includes("verse") then

      -- Remove the class so it doesn't affect other formats
      local newclasses = {}
      for _, c in ipairs(el.classes) do
        if c ~= "verse" then
          table.insert(newclasses, c)
        end
      end
      el.classes = newclasses

      -- Output header first
      table.insert(newblocks, el)

      -- Open verse
      table.insert(newblocks, pandoc.RawBlock("latex", "\\begin{verse}"))

      i = i + 1

      -- Collect everything until the next header (any level)
      while i <= #blocks and blocks[i].t ~= "Header" do
        local nextel = blocks[i]

        -- Convert soft breaks inside paragraphs
        if nextel.t == "Para" then
          local newcontent = {}
          for _, inline in ipairs(nextel.content) do
            if inline.t == "SoftBreak" then
              table.insert(newcontent, pandoc.LineBreak())
            else
              table.insert(newcontent, inline)
            end
          end
          nextel.content = newcontent
        end

        table.insert(newblocks, nextel)
        i = i + 1
      end

      -- Close verse
      table.insert(newblocks, pandoc.RawBlock("latex", "\\end{verse}"))

    else
      table.insert(newblocks, el)
      i = i + 1
    end
  end

  return pandoc.Pandoc(newblocks, doc.meta)
end

function Div(el)
  if el.classes:includes("verse") then
    local blocks = {}

    table.insert(blocks, pandoc.RawBlock("latex", "\\begin{verse}"))

    for _, block in ipairs(el.content) do
      if block.t == "Para" then
        local newcontent = {}

        for _, inline in ipairs(block.content) do
          if inline.t == "SoftBreak" then
            table.insert(newcontent, pandoc.LineBreak())
          else
            table.insert(newcontent, inline)
          end
        end

        block.content = newcontent
      end

      table.insert(blocks, block)
    end

    table.insert(blocks, pandoc.RawBlock("latex", "\\end{verse}"))

    return blocks
  end
end

function Span(el)
  if el.classes:includes("inline-indent") then
    return {
      pandoc.RawInline("latex", "\\hspace{2em}"),
      el
    }
  end
end

