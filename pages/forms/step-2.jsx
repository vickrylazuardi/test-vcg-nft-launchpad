import React from "react";
import { useEffect } from "react";
import {
  FormInputBanner,
  FormInputImage,
} from "../../components/Common/formComponent";
import {
  FaDiscord,
  FaGlobeAsia,
  FaMediumM,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";

export default function Step2(props) {
  function handleInputMemberImage(file) {
    props.getData("icon", file);
  }

  function handleInputBannerItem(file) {
    if (file) {
      props.getData("banner.items", {
        images: file,
        url: props.data.banner.items.url,
      });
    }
  }

  function handleInputBannerItemUrl(value) {
    props.getData("banner.items", {
      images: props.data.banner.items.images,
      url: value,
    });
  }

  function handleInputBannerPlayNow(file) {
    if (file) {
      props.getData("banner.playNow", {
        images: file,
        url: props.data.banner.playNow.url,
      });
    }
  }

  function handleInputBannerPlayNowUrl(value) {
    props.getData("banner.playNow", {
      images: props.data.banner.playNow.images,
      url: value,
    });
  }

  const getNextWeek = () => {
    try {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const day7 = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const month =
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth() + 1;
      const year = date.getFullYear();
      const nextWeek = `${year}-${month}-${day7}T${hour}:${minute}:00.00`;
      document.getElementById("start").min = nextWeek;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNextWeek();
  }, []);

  return (
    <div className="">
      <p className="text-lg font-bold">Project Information</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-color-grey mb-1">
          Project Image
        </p>
        <p className="text-sm font-semibold text-color-grey mb-2">
          Recomendation 1000 x 1000 px Max: 1 MB (.PNG / .JPG) (Image Needed)
        </p>
        <FormInputImage
          preview={props?.data?.icon}
          result={handleInputMemberImage}
        />
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">Project Name</label>
        <input
          type="text"
          maxLength={100}
          className="w-full"
          placeholder="Project Name"
          value={props?.data?.name ?? ""}
          onChange={(e) => props.getData("name", e.target.value)}
        />
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">Description</label>
        <textarea
          rows={3}
          type="text"
          maxLength={200}
          className="w-full"
          placeholder="Project Description"
          value={props?.data?.desc ?? ""}
          onChange={(e) => props.getData("desc", e.target.value)}
        ></textarea>
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">Start Project</label>
        <input
          id="start"
          type="datetime-local"
          className="date-input"
          style={{ colorScheme: "dark" }}
          value={props?.data?.startedAt ?? ""}
          onChange={(e) => props.getData("startedAt", e.target.value)}
        />
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">Sale Duration (Days)</label>
        <input
          type="text"
          placeholder={0}
          style={{ width: "176px" }}
          value={props?.data?.duration ?? ""}
          onChange={(e) => {
            if (!/[0-9]/i.test(e.nativeEvent.data))
              e.target.value = e.target.value.slice(0, -1);
            if (e.target.value <= 0) e.target.value = "";
            if (e.target.value > 90) e.target.value = 90;
            props.getData("duration", e.target.value);
          }}
        />
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">Insert Video Link (Youtube)</label>
        <input
          type="text"
          id="input-url"
          className="w-full"
          placeholder="https://youtube.com"
          value={props?.data?.video ?? ""}
          onChange={(e) => props.getData("video", e.target.value)}
        />
      </div>
      <div className="wrap-input mt-8">
        <label className="label-input">
          Social Media (You can fill or leave it blank)
        </label>
        <div className="input-group">
          <div
            className="input-label-icon"
            style={{ borderRadius: "5px 0px 0px 0px" }}
          >
            <label htmlFor="input-url">
              <FaGlobeAsia className="text-base text-color-grey m-auto" />
            </label>
          </div>
          <input
            style={{ borderRadius: "0px 5px 0px 0px" }}
            type="text"
            id="input-url"
            placeholder="Website"
            value={props?.data?.socialMedia?.website ?? ""}
            onChange={(e) =>
              props.getData("socialMedia.website", e.target.value)
            }
          />
        </div>
        <div className="input-group">
          <div className="input-label-icon" style={{ borderRadius: "0px" }}>
            <label htmlFor="input-medium">
              <FaMediumM className="text-base text-color-grey m-auto" />
            </label>
          </div>
          <input
            style={{ borderRadius: "0px" }}
            type="text"
            id="input-medium"
            placeholder="Medium"
            value={props?.data?.socialMedia?.medium ?? ""}
            onChange={(e) =>
              props.getData("socialMedia.medium", e.target.value)
            }
          />
        </div>
        <div className="input-group">
          <div className="input-label-icon" style={{ borderRadius: "0px" }}>
            <label htmlFor="input-youtube">
              <FaYoutube className="text-base text-color-grey m-auto" />
            </label>
          </div>
          <input
            style={{ borderRadius: "0px" }}
            type="text"
            id="input-youtube"
            placeholder="Youtube Channel"
            value={props?.data?.socialMedia?.youtube ?? ""}
            onChange={(e) =>
              props.getData("socialMedia.youtube", e.target.value)
            }
          />
        </div>
        <div className="input-group">
          <div className="input-label-icon" style={{ borderRadius: "0px" }}>
            <label htmlFor="input-tele">
              <FaTelegram className="text-base text-color-grey m-auto" />
            </label>
          </div>
          <input
            style={{ borderRadius: "0px" }}
            type="text"
            id="input-tele"
            placeholder="Telegram"
            value={props?.data?.socialMedia?.telegram ?? ""}
            onChange={(e) =>
              props.getData("socialMedia.telegram", e.target.value)
            }
          />
        </div>
        <div className="input-group">
          <div
            className="input-label-icon"
            style={{ borderRadius: "0px 5px 0px 0px" }}
          >
            <label htmlFor="input-url">
              <FaDiscord className="text-base text-color-grey m-auto" />
            </label>
          </div>
          <input
            style={{ borderRadius: "0px 0px 5px 0px" }}
            type="text"
            id="input-discord"
            placeholder="Discord"
            value={props?.data?.socialMedia?.discord ?? ""}
            onChange={(e) =>
              props.getData("socialMedia.discord", e.target.value)
            }
          />
        </div>
        <div className="mt-8">
          <p className="text-lg font-bold mb-4">Banner</p>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-semibold text-color-grey mb-1">
                Banner Item
                <span className="text-xs font-normal ml-2">
                  Rekomendasi 1200 x 488 px (.PNG / .JPG) (Image Needed){" "}
                </span>
              </p>
              <FormInputBanner
                idx={"banner-items"}
                preview={props?.data?.banner.items.images}
                result={handleInputBannerItem}
              />
              <div className="wrap-input mt-6">
                <input
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Link Banner Item"
                  value={props?.data?.banner.items.url ?? ""}
                  onChange={(e) => handleInputBannerItemUrl(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-color-grey mb-1">
                Banner Play Now
                <span className="text-xs font-normal ml-2">
                  Rekomendasi 1200 x 488 px (.PNG / .JPG) (Image Needed){" "}
                </span>
              </p>
              <FormInputBanner
                idx={"banner-playnow"}
                preview={props?.data?.banner.playNow.images}
                result={handleInputBannerPlayNow}
              />
              <div className="wrap-input mt-6">
                <input
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Link Banner Play Now"
                  value={props?.data?.banner.playNow.url ?? ""}
                  onChange={(e) => handleInputBannerPlayNowUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
