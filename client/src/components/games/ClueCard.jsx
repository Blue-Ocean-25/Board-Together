import React, { useState, useRef }  from 'react';
import { useQuery } from '@tanstack/react-query';

export default function ClueCard({ playerData }) {
  console.log(playerData);
  return (
    <div>
      <div>
      <table id="suspects" ClassName="table">
        <thead>
          <tr>
            <th>Suspects</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playerData.suspects).map(([suspect,value]) => (
          <tr>
            <td>
              {suspect}
            </td>
            <td>
            <input type="checkbox" name={suspect} value={value}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <table id="weapons" ClassName="table">
        <thead>
          <tr>
            <th>Weapons</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playerData.weapons).map(([weapon, value]) => (
          <tr>
            <td>
              {weapon}
            </td>
            <td>
            <input type="checkbox" name={weapon} value={value}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <table id="rooms" ClassName="table">
        <thead>
          <tr>
            <th>Rooms</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(playerData.rooms).map(([room, value]) => (
          <tr>
            <td>
              {room}
            </td>
            <td>
            <input type="checkbox" name={room} value={value}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  )
}
