/*
 * rrequest
 * http://www.rrequest.com/
 * (C) Copyright Bashton Ltd, 2013
 *
 * This file is part of rrequest.
 *
 * rrequest is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * rrequest is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with rrequest.  If not, see <http://www.gnu.org/licenses/>.
 *
*/
Meteor.startup(function (){
  // register the eventlog module
  Meteor.call('registerModule', {
    name: 'incident',
    callback_enable: 'enable_incident_module',
    callback_disable: 'disable_incident_module',
    description: 'Incident management module.'
  }, function(error, module_id) {
    if (!error) {

    }
  });

  var module = Modules.findOne({name: 'incident'});
  if (module !== undefined && module.enabled) {
    Meteor.call('add_navbar_item', {
      name: 'incident',
      title: 'Incidents',
      url: 'incidents',
      user_level: 'loggedin'
    }, function(error, module_id) {
      if (!error) {}
    });
  }
});

Meteor.methods({
  createIncident: function (options) {
    return create_incident(options);
  }
});

create_incident = function (options) {
  options = options || {};
  var args = {};
  if (options._id !== undefined) {
    args._id = options._id;
  }
  var now = new Date();
  args.subject = options.subject;
  args.created = now;
  args.modified = now;
  args.status = options.status;
  args.groups = options.groups;
  args.comments = [];
  args.tickets = [];

  return Incidents.insert(args);
};