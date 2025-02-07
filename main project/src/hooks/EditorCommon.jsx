import React, { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import MapModal from "../components/MapModal";
import "../style/EditorCommon.scss";

const EditorCommon = () => {
  const editorRef = useRef();
  const [showMapModal, setShowMapModal] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      try {
        const editor = editorRef.current.getInstance();

        editor.insertToolbarItem(
          { groupIndex: 3, itemIndex: 2 },
          {
            name: "map",
            tooltip: "카카오맵 선택",
            className: "toastui-editor-toolbar-icons",
            style: { backgroundImage: "none" },
            command: "mapCommand",
          }
        );

        editor.addCommand("wysiwyg", "mapCommand", () => {
          setShowMapModal(true);
        });
      } catch (error) {
        console.error("Editor initialization error:", error);
      }
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Editor
        ref={editorRef}
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
      />

      {showMapModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MapModal
            onClose={() => setShowMapModal(false)}
            onSelect={(location) => {
              const { address, placeName, lat, lng } = location;
              const mapContent = `
                <div class="map-wrapper">
                  <div class="map-info">
                    <h4>${placeName}</h4>
                    <p>${address}</p>
                  </div>
                  <div class="map-container" 
                    data-lat="${lat}" 
                    data-lng="${lng}"
                    style="width: 100%; height: 300px;">
                  </div>
                </div>
              `;
              if (editorRef.current) {
                editorRef.current.getInstance().insertHTML(mapContent);
              }
              setShowMapModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditorCommon;
