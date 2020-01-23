package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type roomConf struct {
	Floor int    `json:"floor"`
	URLID string `json:"urlId"`
}

type roomConfig map[string]map[string]roomConf

func readRoomConf() (roomConfig, error) {
	c, err := ioutil.ReadFile("conf/rooms.json")
	if err != nil {
		return nil, fmt.Errorf("Room config file cannot be read: %v", err)
	}

	var conf roomConfig
	err = json.Unmarshal(c, &conf)
	if err != nil {
		return nil, fmt.Errorf("Room config is malformed: %v", err)
	}

	return conf, nil
}
