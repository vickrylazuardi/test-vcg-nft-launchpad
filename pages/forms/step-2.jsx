import React from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Step2(props) {
  function handleInputMemberImage(file) {
    props.getData("icon", file);
  }

  return (
    <div className="">
      <p className="text-lg font-bold">Project Information</p>
      <div className="mt-4">
        <div className="flex md:block items-center">
          <div
            className="w-1/4 md:w-full mb-2 text-sm font-semibold"
            style={{ color: "#9AA4BF" }}
          >
            <label>Project Image</label>
          </div>
          <FormInputImage 
            preview={props.data.icon}
            result={handleInputMemberImage}
          />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Project Name</label>
        </div>
        <div className="wrap-input flex-1">
          <input 
            type="text" 
            maxLength={100}
            className="w-full" 
            placeholder="Project Name" 
            value={props.data.name ?? ""}
            onChange={(e) => props.getData("name", e.target.value)}
          />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Description</label>
        </div>
        <div className="wrap-input flex-1">
          <textarea
            rows={3}
            type="text"
            maxLength={200}
            className="w-full"
            placeholder="Project Name"
            value={props.data.desc ?? ""}
            onChange={(e) => props.getData("desc", e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Start Project</label>
        </div>
        <div className="wrap-input flex-1">
          <input 
            id="start"
            className="date-input" 
            type="datetime-local" 
            value={props.data.startedAt ?? ""}
            onChange={(e) => props.getData("startedAt", e.target.value)}
          />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Sale Duration (Days)</label>
        </div>
        <div className="wrap-input flex-1">
          <input 
            type="text" 
            placeholder={0} 
            style={{ width: "50px" }} 
            value={props.data.duration ?? ""}
            onChange={(e) => {
              if (!/[0-9]/i.test(e.nativeEvent.data)) e.target.value = e.target.value.slice(0, -1);
              if (e.target.value <= 0) e.target.value = "";
              if (e.target.value > 90) e.target.value = 90;
              props.getData("duration", e.target.value)
            }}
          />
        </div>
      </div>
      <div className="mt-10">
        <div
          className="mb-3 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Video Link</label>
        </div>
        <div className="wrap-input flex-1">
          <div className="input-group">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-url">URL Link</label>
            </div>
            <input
              type="text"
              id="input-url"
              placeholder="https://youtube.com"
              value={props.data.video ?? ""}
              onChange={(e) => props.getData("video", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div
          className="mb-3 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Social Media (You can fill or leave it blank)</label>
        </div>
        <div className="wrap-input flex-1">
          <div className="input-group">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-url">Website</label>
            </div>
            <input
              type="text"
              id="input-url"
              placeholder="https://website.com"
              value={props.data.socialMedia.website ?? ""}
              onChange={(e) => props.getData("socialMedia.website", e.target.value)}
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-medium">Medium</label>
            </div>
            <input
              type="text"
              id="input-medium"
              placeholder="https://medium.com"
              value={props.data.socialMedia.medium ?? ""}
              onChange={(e) => props.getData("socialMedia.medium", e.target.value)}
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-youtube">Youtube</label>
            </div>
            <input
              type="text"
              id="input-youtube"
              placeholder="https://youtube.com"
              value={props.data.socialMedia.youtube ?? ""}
              onChange={(e) => props.getData("socialMedia.youtube", e.target.value)}
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-tele">Telegram Group</label>
            </div>
            <input
              type="text"
              id="input-tele"
              placeholder="https://web.telegram.org/k/"
              value={props.data.socialMedia.telegram ?? ""}
              onChange={(e) => props.getData("socialMedia.telegram", e.target.value)}
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-discord">Discord</label>
            </div>
            <input
              type="text"
              id="input-discord"
              placeholder="https://discord.com"
              value={props.data.socialMedia.discord ?? ""}
              onChange={(e) => props.getData("socialMedia.discord", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
