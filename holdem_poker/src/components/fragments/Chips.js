import React from "react";

import { useAssetPaths } from "../../contexts/asset_paths";
import {
    chip_denominations,
    max_num_chips_to_create_per_user
} from "../utils/constants";
import { chipImagePath } from "../../utils/image_utils";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// random chip positions must be static, shouldn't change on every render
const random_chip_positions = {};
function getRandomChipPosition(bet_md5, denominated_chips_index) {
    let past_chip_positions = random_chip_positions[bet_md5];
    if (past_chip_positions) {
        if (past_chip_positions[denominated_chips_index]) {
            return past_chip_positions[denominated_chips_index];
        }
    } else {
        random_chip_positions[bet_md5] = {};
    }

    const chip_container_position = {
        top: 10,
        left: 20
    }
    const position_range = {
        top: 30,
        left: 40,
    };
    let new_random_position = {
        top: getRandomIntInclusive(chip_container_position.top - position_range.top, chip_container_position.top + position_range.top),    // chip container top is 10
        left: getRandomIntInclusive(chip_container_position.left - position_range.left, chip_container_position.left + position_range.left)    // chip container left is 20
    };
    random_chip_positions[bet_md5][
        denominated_chips_index
    ] = new_random_position;

    return new_random_position;
}

function Chips({ player, chips_value, bet_md5, ...props }) {
    const assetPaths = useAssetPaths();

    let denominated_chips = [];
    let chips_created = 0;
    let total_chips_value = chips_value;

    chip_denominations.every(function (denomination_value) {
        let max_num_chips_to_create = Math.floor(
            total_chips_value / denomination_value
        );
        let num_chips_allowed_to_add_to_dom =
            max_num_chips_to_create_per_user - chips_created;

        if (max_num_chips_to_create > 0) {
            total_chips_value -= denomination_value * max_num_chips_to_create;

            let chip_id_suffix = "";
            for (let i = 1; i <= max_num_chips_to_create; i++) {
                if (denomination_value < 1) {
                    chip_id_suffix =
                        "_0" +
                        String(Math.round(denomination_value * 100)).padStart(
                            2,
                            "0"
                        );
                } else {
                    chip_id_suffix = denomination_value;
                }

                if (num_chips_allowed_to_add_to_dom > 0) {
                    num_chips_allowed_to_add_to_dom--;
                    denominated_chips.push({
                        id_suffix: chip_id_suffix,
                        position: getRandomChipPosition(
                            bet_md5,
                            denominated_chips.length
                        )
                    });
                }

                chips_created++;
            }
        }

        return (
            total_chips_value > 0 &&
            chips_created < max_num_chips_to_create_per_user
        );
    });

    return (
        <React.Fragment>
            {denominated_chips.map((chip_data, index) => (
                <div
                    className={`chip_${chip_data.id_suffix} chips`}
                    key={index}
                    style={{
                        display: "block",
                        ...chip_data.position
                    }}
                >
                    <img
                        src={chipImagePath(assetPaths)}
                        style={{ left: "auto" }}
                        alt={`chip`}
                    />
                </div>
            ))}
        </React.Fragment>
    );
}

export default Chips;
